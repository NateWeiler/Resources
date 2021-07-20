class ParserError(Exception):
    pass

class Sentence(object):
    def __init__(self, subject, verb, obj): 
        self.subject = subject 
        self.verb = verb
        self.object = obj


def peek(word_list):                # Return the 'word_type' of one word tuple
    return word_list[0][0]   
 

def match(word_list):               # Take outone word tuple, and return its 'word'
    word = word_list.pop(0)         # Can be simplified to one line：return word_list.pop(0)[1]
    return word[1]               
    

def skip(word_list, skip_type):     # Traverse the word_list reversely, and remove all word tuple that should be ignored since the forward traverse may skip elements, for example:
    for word in word_list[::-1]:    # When the element of index 2 is removed during the traversal, the index of its next element will change from 3 to 2. 
        if word[0] == skip_type:    # However, the traversal won't check the NEW index 2 element and will continue with index 3，which means it will be skipped. 
            word_list.remove(word)  # Therefore, we need to traverse the list reversely to get rid of this issue.
    return word_list


def parse_subject(word_list):
    if peek(word_list) == 'noun':
        return match(word_list)
    elif peek(word_list) == 'verb':
        return 'player'
    else:
        raise ParserError("Expected a verb next.")


def parse_verb(word_list):
    if peek(word_list) == 'verb':
        return match(word_list)
    else:
        raise ParserError("Expected a verb next.")


def parse_object(word_list):
    if peek(word_list) == 'noun' or peek(word_list) == 'direction' or peek(word_list) == 'number':
        return match(word_list)
    else:
        raise ParserError("Expected a noun or direction next.")


def parse_sentence(word_list):      # Analyze word_list, get its subject, verb and object, and save them in the property of the instantiated Sentence() class
    skip(word_list, 'stop')
    skip(word_list, 'error')       
    subj = parse_subject(word_list)
    verb = parse_verb(word_list)
    obj = parse_object(word_list)
    return Sentence(subj, verb, obj)


x = parse_sentence([('verb', 'run'), ('direction', 'north'), ('verb', 'go')])
#print(x.subject, x.verb, x.object)
y = parse_sentence([('noun', 'bear'), ('verb', 'eat'), ('stop', 'in'), ('stop', 'the'), ('noun', 'honey')])
#print(y.subject, y.verb, y.object)
z = parse_sentence([('verb', 'go'), ('error', 'asdfd'),('number', 123)])
#print(z.subject, z.verb, z.object)
#print(my_sentence.__dict__) 

