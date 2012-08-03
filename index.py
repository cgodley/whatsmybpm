from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
import os

TAB_NAMES = ['Measure','History']
TAB_DIRECTORY = 'tabs/'

_DEBUG = True

class MainPage(webapp.RequestHandler):

  def generate_template(self, template_name, values={}):
    directory = os.path.dirname(__file__)
    path = os.path.join(directory, os.path.join('templates', template_name))
    self.response.out.write(template.render(path, values, debug=_DEBUG))
  
  def get(self):
    tab_paths = map(lambda name: '%s%s.html' % (TAB_DIRECTORY, name.lower()), TAB_NAMES)
    tab_paths_by_name = dict(zip(TAB_NAMES, tab_paths))
    
    self.generate_template('index.html', values={'tab_paths_by_name' : tab_paths_by_name })


application = webapp.WSGIApplication([('/', MainPage)], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()