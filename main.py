########################################################################################
######################          Import packages      ###################################
########################################################################################
from flask import Blueprint, render_template, flash
from flask_login import login_required, current_user
from __init__ import create_app, db
import plotly.express as px
import pandas as pd
from dash import html as html
import plotly as py
import folium
import matplotlib.pyplot as plt
import plotly.graph_objects as go

########################################################################################
# our main blueprint
main = Blueprint('main', __name__)

@main.route('/') # home page that return 'index'
def index():
    return render_template('index.html')

@main.route('/profile') # profile page that return 'profile'
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)

@main.route('/reports') 
@login_required
def reports():
    data = pd.read_csv("static/mtgox_accounts.csv", encoding = 'latin1', on_bad_lines='skip')
    emails = ['gmail', 'yahoo','msn','hotmail','aol', 'org', 'sbcglobal','gmx','mail.ru','nan','edu']
    pat = '|'.join(emails)
    s = data['Email'].str.extract('('+ pat + ')', expand=False)
    df1 = data.groupby(s).size().reset_index(name='Count')
    df1.loc[6]=['Others', 61006-276-20692-3329-1012-469-1-917-100-3517-144-354]
    Pie_fig = px.pie(df1, values='Count', names='Email')


    return render_template('reports.html', 
    name=current_user.name,
    pie_chart_div = Pie_fig.to_html(full_html = False)
    )

    
    #pie_chart_div = pieChart.to_html(full_html = False)

app = create_app() # we initialize our flask app using the __init__.py function
if __name__ == '__main__':
    db.create_all(app=create_app()) # create the SQLite database
    app.run(debug=True) # run the flask app on debug mode