## Publics repos

With Ruby 1.8 (default version on MacOS) :

```
sudo gem install json
curl -s https://api.github.com/orgs/[ORGANIZATION]/repos | ruby -rubygems -e 'require “json”; JSON.load(STDIN.read).each {|repo| %x[git clone #{repo["ssh_url"]} ]}'
```

With Ruby 1.9+, the json library is by default thus you just use :

```
curl -s https://api.github.com/orgs/[ORGANIZATION]/repos | ruby -rjson -e 'JSON.load(STDIN.read).each {|repo| %x[git clone #{repo["ssh_url"]} ]}'
```

---

## Private repos

```
curl -u [[USERNAME]] -s https://api.github.com/orgs/[[ORGANIZATION]]/repos?per_page=200 | ruby -rubygems -e 'require "json"; JSON.load(STDIN.read).each { |repo| %x[git clone #{repo["ssh_url"]} ]}'
```
