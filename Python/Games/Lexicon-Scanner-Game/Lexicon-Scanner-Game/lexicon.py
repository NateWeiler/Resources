def scan(stuff): 
    words = stuff.split( )
    results = []
    for word in words:
        if lexi.get(word.lower(), None):
            word_type = lexi[word.lower()]
        elif convert_number(word):
            word_type = 'number'
            word = int(word)
        else:
            word_type = 'error'
        results.append((word_type, word))
    #print(results)
    return results 
        
        
lexi = {
        'north': 'direction',   'south': 'direction', 
        'east': 'direction',    'west': 'direction',
        'down': 'direction',    'up': 'direction', 
        'left': 'direction',    'right': 'direction',
        
        'go': 'verb',           'stop': 'verb',
        'kill':'verb',          'eat': 'verb',
        'run': 'verb',

        'the': 'stop',          'in': 'stop', 
        'of': 'stop',           'from': 'stop',
        'at': 'stop',           'it':'stop', 
        
        'door': 'noun',         'bear': 'noun', 
        'princess': 'noun',     'cabinet': 'noun',
        'player': 'noun'
       }


def convert_number(s):
    try:
        return int(s)
    except ValueError:
        return None

#stuff = input('> ')
#scan(stuff)