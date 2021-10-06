########  imports  ##########
from flask import Flask, jsonify, request, render_template
app = Flask(__name__)



@app.route('/')
def home_page():
    example_embed='This string is from python'
    return render_template('index.html', embed=example_embed)


@app.route('/getSupabaseKey', methods=['GET', 'POST'])
def testfn():
    # GET request
    if request.method == 'GET':
        message = {'key':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTk1MTgzNywiZXhwIjoxOTQ3NTI3ODM3fQ.OVMR_WiGUsuCVylx7Ih6Kuy40LYK-eipFKu7t6qydUE'}
        return jsonify(message)  # serialize and use JSON headers
    # POST request
    if request.method == 'POST':
        print(request.get_json())  # parse as JSON
        return 'Sucesss', 200


#########  run app  #########
app.run(debug=True)