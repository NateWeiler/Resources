import pdfcrowd
import sys

try:
    # create the API client instance
    client = pdfcrowd.HtmlToPdfClient(ce544b6ea52a5621fb9d55f8b542d14d')

    # run the conversion and write the result to a file
    client.convertUrlToFile('https://pdfcrowd.com/doc/api/html-to-pdf/python/', 'example.pdf')
except pdfcrowd.Error as why:
    # report the error
    sys.stderr.write('Pdfcrowd Error: {}\n'.format(why))

    # rethrow or handle the exception
    raise
