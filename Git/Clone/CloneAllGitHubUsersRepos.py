#!python3

import requests
import os

username = "ADD_HERE"

repos_url = f"https://api.github.com/users/{username}/repos"
response = requests.get(repos_url, headers=headers)
repos = response.json()

for repo in repos:
    repo_name = repo["name"]
    clone_url = repo["clone_url"]
    print(f"Cloning {repo_name}...")
    os.system(f"git clone {clone_url}")