########  imports  ##########
from flask import Flask, jsonify, request, render_template
from supabase_py import create_client, Client
import os

app = Flask(__name__)
data = list(range(1,300,3))
SBaseUrl: str = "https://kgshezreyobypiidaeii.supabase.co" # os.environ.get("SUPABASE_URL")
SBaseKey: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTk1MTgzNywiZXhwIjoxOTQ3NTI3ODM3fQ.OVMR_WiGUsuCVylx7Ih6Kuy40LYK-eipFKu7t6qydUE" # os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SBaseUrl, SBaseKey)

@app.route('/')
def home_page():
    example_embed='This string is from python'
    return render_template('index.html', embed=example_embed)


@app.route('/getShortcuts', methods=['GET'])
def testfn1():
    if request.method == 'GET':
        data = supabase.table("shortcuts").select("*").execute()
        shortcuts = data.get("data", [])
        returnValue = shortcuts
        return jsonify(returnValue)  # serialize and use JSON headers

###### Data fetch ############

@app.route('/pushNewShortcut/<shortcut>/<url>', methods=['GET','POST'])
def data_get(shortcut,url):
    pushWasSuccessfull = False
    if request.method == 'POST': # POST request
        print(request.get_text())  # parse as text
        return 'OK', 200

    else: # GET request
        print("******************")
        print(shortcut+"->"+url)
        print("******************")
        pushWasSuccessfull = addNewShortCutToDatabase(shortcut, url)
        if pushWasSuccessfull:
            return "True"
        else:
            return "False"


def addNewShortCutToDatabase(shortcut, url):
    pushWasSuccessfull = False 
    data = supabase.table("shortcuts").insert({"shortcut":shortcut, "destination_link":url, }).execute()
    return pushWasSuccessfull

#########  run app  #########
app.run(debug=True)