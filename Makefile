DOMAINS_LIST		:= ./build/freemail_domains.txt
DOMAINS_LIST_PLUS	:= ./assets/not-found-in-spamassassin-list.txt
DOMAINS_START		:= free email providers start
DOMAINS_END			:= free email providers end

COMMON_JS_SRC		:= ./src/commonjs/index.js
JS_SRC 				:= ./src/javascript/is-biz-mail.js
JS_TEMP_SRC			:= ./build/freemail_domains.js
JS_CLOSURE 			:= (function(global){
JS_CLOSURE_END 		:= })((

GIT_TAG				:= $(shell git describe --tags `git rev-list --tags --max-count=1`)

.PHONY: all

all: javascript

clean: prepare
	@find ./build -mindepth 1 -delete

prepare:
	@mkdir -pv ./build

download: prepare
	@wget -q http://svn.apache.org/repos/asf/spamassassin/trunk/rules/20_freemail_domains.cf -O $(DOMAINS_LIST).tmp
	@grep -Ei 'freemail_domains (.*)$$' $(DOMAINS_LIST).tmp | grep -oP 'freemail_domains \K.*' > $(DOMAINS_LIST)
	@sed '$$!{:a;N;s/\n/ /;ta}' $(DOMAINS_LIST_PLUS) > $(DOMAINS_LIST).plus # replace all new lines with a signle whitespace
	@sed 's/ /\n/6;P;D' -i $(DOMAINS_LIST).plus # Split a single line in multiple rows each containing maximum 6 domains
	@cat $(DOMAINS_LIST).plus >> $(DOMAINS_LIST) # Append the list of domains not found in SpamAssassin to the rest
	@sed -e ':a' -e 'N' -e '$$!ba' -e 's/\n/",\n"/g' -i $(DOMAINS_LIST)
	@sed -e 's/ /", "/g' -i $(DOMAINS_LIST)
	@echo "\"$$(cat $(DOMAINS_LIST))\"," > $(DOMAINS_LIST)

commonjs: download
	@sed '/$(DOMAINS_START)/,/$(DOMAINS_END)/{//!d}' -i $(COMMON_JS_SRC)
	@sed -e ':a' -e 'N' -e '$$!ba' -e 's/\n//g' $(DOMAINS_LIST) > $(JS_TEMP_SRC)
	@echo "    $$(cat $(JS_TEMP_SRC))" > $(JS_TEMP_SRC)
	@sed '/$(DOMAINS_START)/ r $(JS_TEMP_SRC)' -i $(COMMON_JS_SRC)

javascript: commonjs
	@sed '/$(JS_CLOSURE)/,/$(JS_CLOSURE_END)/{//!d}' -i $(JS_SRC)
	@sed 's/^/    /' $(COMMON_JS_SRC) > $(JS_TEMP_SRC)
	@sed 's/^    $$//' -i $(JS_TEMP_SRC)
	@sed '/$(JS_CLOSURE)/r $(JS_TEMP_SRC)' -i $(JS_SRC)
	@sed 's/module.exports/global.isBizMail/g' -i $(JS_SRC)

tests:
	@npm test

bump_version:
	@npm version $(GIT_TAG)
