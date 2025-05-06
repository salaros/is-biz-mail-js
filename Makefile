DOMAINS_LIST		:= ./build/freemail_domains.txt
DOMAINS_LIST_PLUS	:= ./assets/emails-manually-added.txt
DOMAINS_COMMENT		:= free email providers
DOMAINSW_COMMENT	:= free email patterns
USER_AGENT	:= free email patterns

ES_OUT 				:= ./lib/main.js

GIT_TAG				:= $(shell git describe --tags `git rev-list --tags --max-count=1`)

.PHONY: all

all: update

clean: prepare
	@find ./build -mindepth 1 -delete

prepare:
	@mkdir -pv ./build

download: prepare
	@wget --user-agent="$(USER_AGENT)" -q https://raw.githubusercontent.com/apache/spamassassin/trunk/rules/20_freemail_domains.cf -O $(DOMAINS_LIST).tmp
	@wget --user-agent="$(USER_AGENT)" -q https://raw.githubusercontent.com/apache/spamassassin/trunk/rules/20_freemail_mailcom_domains.cf -O ->> $(DOMAINS_LIST).tmp
	@sed 's/\r$$//' -i $(DOMAINS_LIST).tmp # Replace \r\n endings with \n
	@grep -Ei 'freemail_domains (.*)$$' $(DOMAINS_LIST).tmp | grep -oP 'freemail_domains \K.*' > $(DOMAINS_LIST) && rm $(DOMAINS_LIST).tmp
	@cat $(DOMAINS_LIST_PLUS) >> $(DOMAINS_LIST) # Append the list of domains not found in SpamAssassin to the rest
	@sed -E -e 's/[[:blank:]]+/\n/g' -i $(DOMAINS_LIST) # Replace all spaces with new lines
	@wget --user-agent="$(USER_AGENT)" -q https://raw.githubusercontent.com/MattKetmo/EmailChecker/master/res/throwaway_domains.txt -O ->> $(DOMAINS_LIST)
	@wget --user-agent="$(USER_AGENT)" -q https://f.hubspotusercontent40.net/hubfs/2832391/Marketing/Lead-Capture/free-domains-2.csv -O ->> $(DOMAINS_LIST) # HubSpot-curated list https://knowledge.hubspot.com/forms/what-domains-are-blocked-when-using-the-forms-email-domains-to-block-feature
	@grep "*" $(DOMAINS_LIST) > $(DOMAINS_LIST).wildcard # Move all wildcard patterns to a separate file
	@sed "/*/d" $(DOMAINS_LIST) > $(DOMAINS_LIST).tmp # Remove wildcard patterns from the list of domains
	@awk '!seen[$$0]++' $(DOMAINS_LIST).tmp | sort > $(DOMAINS_LIST)
	@sed '$$!{:a;N;s/\r/ /;ta}' -i $(DOMAINS_LIST)* # replace all new lines with a single whitespace
	@sed '$$!{:a;N;s/\n/ /;ta}' -i $(DOMAINS_LIST)* # replace all new lines with a single whitespace
	@sed -e 's/[[:space:]]*$$//g' -i $(DOMAINS_LIST)*
	@sed -e 's/^[[:space:]]*//g' -i $(DOMAINS_LIST)*
	@sed -e 's/  / /g' -i $(DOMAINS_LIST)*
	@sed 's/ /\n/6;P;D' -i $(DOMAINS_LIST)* # Split a single line in multiple rows each containing maximum 6 domains
	@sed -e 's/ /", "/g' -i $(DOMAINS_LIST)*
	@sed -e ':a' -e 'N' -e '$$!ba' -e 's/\n/",\n"/g' -i $(DOMAINS_LIST)*
	@find ./build -type f | xargs -I{} sh -c 'echo "\"$$(cat $$1)\"," > $$1' -- {}

update: download
	@sed '/$(DOMAINS_COMMENT) start/,/$(DOMAINS_COMMENT) end/{//!d}' -i $(ES_OUT)
	@sed '/$(DOMAINSW_COMMENT) start/,/$(DOMAINSW_COMMENT) end/{//!d}' -i $(ES_OUT)
	@sed '/$(DOMAINS_COMMENT) start/ r $(DOMAINS_LIST)' -i $(ES_OUT)
	@sed '/$(DOMAINSW_COMMENT) start/ r $(DOMAINS_LIST).wildcard' -i $(ES_OUT)

tests:
	@npm test

bump_version:
	@npm version $(GIT_TAG)
