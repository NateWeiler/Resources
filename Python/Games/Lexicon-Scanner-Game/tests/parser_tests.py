from nose.tools import assert_equal, assert_raises
from Lexicon-Scanner-Game import parser_opt


def test_Sentence():
    mysentence = parser_opt.Sentence('bear', 'eat', 'princess')
    assert_equal(mysentence.subject, 'bear')
    assert_equal(mysentence.verb, 'eat')
    assert_equal(mysentence.object, 'princess')


def test_peek():
    test_list = [('noun', 'bear'), ('verb', 'eat'), ('stop', 'the'), ('noun', 'princess')]
    assert_equal(parser_opt.peek(test_list), 'noun')
    # We can also use assert peek(test_list) == 'noun'，but assert_equal can provide more feedback of the error.
    

def test_match():
    test_list = [('noun', 'bear'), ('verb', 'eat'), ('stop', 'the'), ('noun', 'princess')]
    assert_equal(parser_opt.match(test_list), 'bear')
    assert_equal(test_list, [('verb', 'eat'), ('stop', 'the'), ('noun', 'princess')])


def test_skip():
    test_list = [('noun', 'bear'), ('verb', 'eat'), ('stop', 'the'), ('error', 'asdd')]
    assert_equal(parser_opt.skip(test_list, 'stop'), [('noun', 'bear'), ('verb', 'eat'), ('error', 'asdd')])
    assert_equal(parser_opt.skip(test_list, 'error'), [('noun', 'bear'), ('verb', 'eat')])


def test_parse_subject():
    test_list = [('noun', 'bear'), ('verb', 'eat'), ('stop', 'the'), ('noun', 'princess')]
    assert_equal(parser_opt.parse_subject(test_list), 'bear')
    test_list2 = [('verb', 'eat'), ('stop', 'the'), ('noun', 'princess')]
    assert_equal(parser_opt.parse_subject(test_list), 'player')
    test_list3 = [('stop', 'the'), ('noun', 'princess')]
    assert_raises(parser_opt.ParserError, parser_opt.parse_subject, test_list3)


def test_parse_verb():
    test_list = [('verb', 'eat'), ('stop', 'the'), ('noun', 'princess')]
    assert_equal(parser_opt.parse_verb(test_list), 'eat')
    test_list2 = [('stop', 'the'), ('noun', 'princess')]
    assert_raises(parser_opt.ParserError, parser_opt.parse_verb, test_list2)


def test_parse_object():
    test_list = [('noun', 'princess')]
    assert_equal(parser_opt.parse_object(test_list), 'princess')
    test_list2 = [('direction', 'north')]
    assert_equal(parser_opt.parse_object(test_list2), 'north')
    test_list3 = [('number', 111)]
    assert_equal(parser_opt.parse_object(test_list3), 111)
    test_list4 = [('stop', 'the')]
    assert_raises(parser_opt.ParserError, parser_opt.parse_object, test_list4)


def test_parse_sentence():
    test_list = [('noun', 'bear'), ('verb', 'eat'), ('stop', 'the'), ('noun', 'princess')]
    test_object = parser_opt.parse_sentence(test_list)
    assert_equal(test_object.subject, 'bear')
    assert_equal(test_object.verb, 'eat')
    assert_equal(test_object.object, 'princess')


''' As a method of nose.tools， assert_raises(exception, callable,
parameters) tests to make sure a specified exception can be raised
when presented with certain parameters. '''
# The first argument is the exception type you expect. 
# The second is the function to call. 
# The rest of the arguments will be passed to the function (could be more than 1).