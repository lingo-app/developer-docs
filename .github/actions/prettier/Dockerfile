FROM node:10

LABEL "version"="1.0.0"
LABEL "repository"="https://github.com/thenounproject/lingo-api"
LABEL "homepage"="https://github.com/thenounproject/"
LABEL "maintainer"="Noun Project <developers@thenounproject.com>"

LABEL "com.github.actions.name"="GitHub Action for prettier"
LABEL "com.github.actions.description"="Validate the code formatting with prettier."
LABEL "com.github.actions.icon"="align-left"
LABEL "com.github.actions.color"="yellow"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN npm install --global prettier

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD [ "" ]