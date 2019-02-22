DOMAINS_LIST		:= ./build/freemail_domains.txt
DOMAINS_LIST_PLUS	:= ./assets/emails-not-in-spamassassin.txt
DOMAINS_COMMENT		:= free email providers
DOMAINSW_COMMENT	:= free email patterns

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
	@wget -q https://raw.githubusercontent.com/apache/spamassassin/trunk/rules/20_freemail_domains.cf -O $(DOMAINS_LIST).tmp
	@wget -q https://raw.githubusercontent.com/apache/spamassassin/trunk/rules/20_freemail_mailcom_domains.cf -O ->> $(DOMAINS_LIST).tmp
	@sed 's/\r$$//' -i $(DOMAINS_LIST).tmp # Replace \r\n endings with \n
	@grep -Ei 'freemail_domains (.*)$$' $(DOMAINS_LIST).tmp | grep -oP 'freemail_domains \K.*' > $(DOMAINS_LIST) && rm $(DOMAINS_LIST).tmp
	@cat $(DOMAINS_LIST_PLUS) >> $(DOMAINS_LIST) # Append the list of domains not found in SpamAssassin to the rest	
	@sed -E -e 's/[[:blank:]]+/\n/g' -i $(DOMAINS_LIST) # Replace all spaces with new lines
	@wget -q https://raw.githubusercontent.com/MattKetmo/EmailChecker/master/res/throwaway_domains.txt -O ->> $(DOMAINS_LIST)
	@grep "*" $(DOMAINS_LIST) > $(DOMAINS_LIST).wildcard # Move all wildcard patterns to a separate file
	@sed "/*/d" $(DOMAINS_LIST) > $(DOMAINS_LIST).tmp # Remove wildcard patterns from the list of domains
	@awk '!seen[$$0]++' $(DOMAINS_LIST).tmp | sort > $(DOMAINS_LIST)
	@sed '$$!{:a;N;s/\n/ /;ta}' -i $(DOMAINS_LIST)* # replace all new lines with a single whitespace
	@sed 's/ /\n/6;P;D' -i $(DOMAINS_LIST)* # Split a single line in multiple rows each containing maximum 6 domains
	@sed -e ':a' -e 'N' -e '$$!ba' -e 's/\n/",\n"/g' -i $(DOMAINS_LIST)*
	@sed -e 's/ /", "/g' -i $(DOMAINS_LIST)*
	@find ./build -type f | xargs -I{} sh -c 'echo "\"$$(cat $$1)\"," > $$1' -- {}

commonjs: download
	@sed '/$(DOMAINS_COMMENT) start/,/$(DOMAINS_COMMENT) end/{//!d}' -i $(COMMON_JS_SRC)
	@sed '/$(DOMAINSW_COMMENT) start/,/$(DOMAINSW_COMMENT) end/{//!d}' -i $(COMMON_JS_SRC)
	@sed '/$(DOMAINS_COMMENT) start/ r $(DOMAINS_LIST)' -i $(COMMON_JS_SRC)
	@sed '/$(DOMAINSW_COMMENT) start/ r $(DOMAINS_LIST).wildcard' -i $(COMMON_JS_SRC)
	@sed 's/^"/    "/' -i $(COMMON_JS_SRC)

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
