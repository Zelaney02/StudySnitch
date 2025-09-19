import streamlit as st
import pandas as pd
import time
from simple_storage import storage as r

# Function to simulate user actions with random durations
def simulate_user_actions():
    actions = []
    actions.append({'Action': 'Linear Algebra', 'Duration': 3})
    actions.append({'Action': 'Break', 'Duration': 5})
    actions.append({'Action': 'CS Assignment', 'Duration': 2})
    return pd.DataFrame(actions)

# Streamlit app
def main():
    st.title("StudySnitch Analytics")

    actions_df = simulate_user_actions()

    st.subheader("User Actions and Durations")
    st.table(actions_df)

    st.subheader("Graph of Action Durations")
    st.line_chart(actions_df['Duration'])

    inattention_count = r.get('bad') or '0'
    st.info(f"User didn't pay attention {inattention_count} times.")

if __name__ == "__main__":
    main()
