from taipy.gui import Gui

length = 3

textl1 = "Event 1"
textr1 = "Time 1"
textl2 = "Event 2"
textr2 = "Time 2"
textl3 = "Event 3"
textr3 = "Time 3"

page = f"""
# Add input here:

Event 1: <|{textl1}|input|><|{textr1}|input|>
Event 2: <|{textl2}|input|><|{textr2}|input|>
Event 3: <|{textl3}|input|><|{textr3}|input|>

<|Add Field|button|on_action=add_field|>
"""

Gui(page).run()
