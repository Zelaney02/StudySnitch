from html2image import Html2Image
#hti = Html2Image()
hti = Html2Image(custom_flags=['--no-sandbox'])
hti.browser_executable = "/usr/bin/google-chrome"
hti.screenshot(url='https://www.python.org', save_as='python_org.png')
