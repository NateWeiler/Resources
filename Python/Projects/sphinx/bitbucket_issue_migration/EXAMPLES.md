Examples
=========

procedure to transfer sphinx issues
------------------------------------

1. dump issues to json file::

   `$ migrate.py -u birkenfeld -s sphinx -g shimizukawa -d sphinx-doc/testing -o issues.json -n`

2. clone hg repository as sphinx-hg and create hglog.json::

   `$ hglog2json.py /path/to/sphinx-hg hglog.json`

3. clone git repository as sphinx-git and create gitlog.json::

   `$ gitlog2json.py /path/to/sphinx-git gitlog.json`

4. convert BB links and changeset markers in the issues.json::

   `$ convert_issues.py -s birkenfeld/sphinx -d sphinx-doc/sphinx -i issues.json -o issues_git.json -m hglog.json -g gitlog.json`

5. push issues to github::

   `$ migrate.py -u birkenfeld -s sphinx -g shimizukawa -d sphinx-doc/testing -k <gh-api-token> -i issues_git.json`

