from nose.tools import *
from lexicon import *
from lexicon.parser import *

def test_parser():
	test_sentence = "I want to kill the bear"
	result = scan(test_sentence)
	#assert_equal(result, "")
	parsed_result = parse_sentence(result)
	assert_equal(parsed_result.subject, 'player')
	assert_equal(parsed_result.verb, 'kill')
	assert_equal(parsed_result.object, 'bear')

