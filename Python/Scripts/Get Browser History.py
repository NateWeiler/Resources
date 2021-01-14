'''
95-Get Browser History

Tested on Linux Mint and Windows 7

pip3 install browserhistory

https://github.com/kcp18/browserhistory
'''

import browserhistory as bh

dict_obj = bh.get_browserhistory()
dict_obj.keys()
dict_keys = ['safari', 'chrome', 'firefox']

# Write the data to csv files in the current working directory.
bh.write_browserhistory_csv()

