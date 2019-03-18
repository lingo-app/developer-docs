workflow "Build Alpha" {
  on = "push"
  resolves = ["Notify-Internal"]
}

action "Prettier" {
  uses = "./.github/actions/prettier"
}

action "Test-UI" {
  uses = "./.github/actions/test-ui"
}

action "Master" {
  needs=["Prettier", "Test-UI"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Build" {
  needs= "Master"
  uses = "./.github/actions/build"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  env ={
    AWS_DEFAULT_REGION = "us-east-1"
  }
}

action "Notify-Internal" {
  needs = "Build"
  uses = "./.github/actions/slack"
  secrets=["SLACK_LINGO_SKETCH"]
}
