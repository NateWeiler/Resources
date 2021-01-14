'''
22-get latest sports scores
pip install sports.py
More info https://pypi.org/project/sports.py/
'''
import sports

all_matches = sports.all_matches()

# Change name to desired sport.
# baseball, basketball,cricket,football,handball,hockey,
# rugby_u, rugby_l, soccer, tennis,volleyball.
MATCHES = all_matches['cricket']

for match in MATCHES:
    print('{} vs {}: {}-{}'.format(match.home_team, match.away_team,
                                   match.home_score, match.away_score))
