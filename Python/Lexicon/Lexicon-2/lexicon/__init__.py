def scan(sentence):
	
	north = ('direction', 'north')
	south = ('direction', 'south')
	east = ('direction', 'east')
	west = ('direction', 'west')
	go = ('verb', 'go')
	walk = ('verb', 'walk')
	run = ('verb', 'run')
	kill = ('verb', 'kill')
	eat = ('verb', 'eat')
	the = ('stop', 'the')
	in_ = ('stop', 'in')
	of = ('stop', 'of')
	a = ('stop', 'a')
	an = ('stop', 'an')
	bear = ('noun', 'bear')
	princess = ('noun', 'princess')
	lexicon = [north, south, east, west,
	           go, walk, run, kill, eat,
	           the, in_, of, a, an,
	           bear, princess]

	words = sentence.split()

	#print words

	matched = []

	for i in words:

		#error = True

		for j in lexicon:

			if i == j[1]:

		#		error = False
				matched.append(j)

		if i.isdigit() == True:

			i = int(i)
			error = False
			matched.append(('number', i))

		#if error == True:
			
		#	matched.append(('error', i))
	
	#print matched

	return matched

