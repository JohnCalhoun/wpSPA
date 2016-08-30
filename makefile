.PHONY: clean upload style js assets php stage

clean:
	rm -r ./tmp/staging/*; rm -r ./tmp/bakehard/*

style: 
	cd ./style && make all 

js: 
	cd ./js && make all

assets: 
	cd ./assets && make all

php: 
	cd ./php && make all

stage: style js assets php
	echo 'staging'

package: stage
	cp -r ./tmp/staging/* ./tmp/bakehard && \
	cd ./tmp && \
	zip -r bakehard.zip ./bakehard	&& \
	mv bakehard.zip .. 

upload:
	scp -r -P 18765 ./tmp/staging/* johnmcal@johnmcalhoun.com:~/public_html/bakehard/wp-content/themes/bakehard
	
