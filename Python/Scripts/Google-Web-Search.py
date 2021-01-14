#! python3

# Google Web Search

search_results = Google.search("This is my query")


# search_results will contain a list of GoogleResult objects

GoogleResult:
    self.name # The title of the link
    self.link # The link url
    self.description # The description of the link
    self.thumb # The link to a thumbnail of the website (not implemented yet)
    self.cached # A link to the cached version of the page
    self.page # What page this result was on (When searching more than one page)
    self.index # What index on this page it was on
