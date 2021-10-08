########  imports  ##########
from flask import Flask, jsonify, request, render_template
from supabase_py import create_client, Client
import os

app = Flask(__name__)
SBaseUrl: str = os.environ.get("SUPABASE_URL")
SBaseKey: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SBaseUrl, SBaseKey)

print("SBaseUrl: "+ SBaseUrl)
print("SBaseKey: "+ SBaseKey)

@app.route('/')
def home_page():
    return render_template('index.html')


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
    try: 
        data = supabase.table("shortcuts").insert({"shortcut":shortcut, "destination_link":url, }).execute()
        pushWasSuccessfull = len(data.get("data", [])) > 0
    except:
        pushWasSuccessfull = False
    return pushWasSuccessfull

#########  run app  #########
app.run(debug=True)