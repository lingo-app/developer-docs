FROM ruby:2.6.1

LABEL "version"="1.0.0"
LABEL "repository"="https://github.com/thenounproject/lingo"
LABEL "homepage"="https://github.com/thenounproject/"
LABEL "maintainer"="Noun Project <developers@thenounproject.com>"

LABEL "com.github.actions.name"="GitHub Action for deploying lingo devloper site"
LABEL "com.github.actions.description"="Deploy developer site."
LABEL "com.github.actions.icon"="align-left"
LABEL "com.github.actions.color"="blue"

ENV GEM_HOME="/usr/local/bundle"
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

RUN gem update --system
RUN gem install bundler -v "2.0.1"

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev
RUN pip3 install --upgrade awscli

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD [ "" ]