workflow "Process" {
  on = "push"
  resolves = ["Deploy Docs"]
}

action "Master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy Docs" {
  needs= "Master"
  uses = "./.github/actions/deploy-docs"
  secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"]
  env ={
    AWS_DEFAULT_REGION = "us-east-1"
  }
}