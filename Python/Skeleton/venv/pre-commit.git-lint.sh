#!/bin/bash
# Copyright 2013-2014 Sebastian Kreft
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# First part return the files being commited, excluding deleted files.
git diff-index -z --cached HEAD --name-only --diff-filter=ACMRTUXB |
xargs --null --no-run-if-empty git lint;

if [ "$?" != "0" ]; then
  echo "There are some problems with the modified files.";
  echo "Fix them before committing or suggest a change to the rules defined in REPO_HOME/.gitlint.yaml.";
  echo "If it is not possible to fix them all commit with the option --no-verify.";

  exit 1;
fi
