

class ScreenOne extends React.Component {
    constructor(props) {
        super();

        this.state = {
            response: [],
            name: 'ankit',
            currentPlaying: [],
            currentPlayingId: '',
            secondScreenStatus: false
        }

        this.getSongsList = this.getSongsList.bind(this);
        this.selectedSong = this.selectedSong.bind(this);
        this.previousSong = this.previousSong.bind(this);
        this.nextSong = this.nextSong.bind(this);
        this.reLoadAudio = this.reLoadAudio.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    getSongsList() {
        $.ajax({
            method: "GET",
            url: 'https://parseapi.back4app.com/classes/songs_library',
            // data: { name: "John", location: "Boston" },
            headers: {
                "X-Parse-Application-Id": "VSPdpDKRMND382hqIRFIaiVLgbkhM0E1rL32l1SQ",
                "X-Parse-REST-API-Key": "E4ZeObhQv3XoHaQ3Q6baHGgbDPOkuO9jPlY9gzgA"
            }
        })
            .done(function (msg) {
                //  console.log(msg);
                this.setState({
                    response: msg
                }, console.log('state updated'))
            }.bind(this));
    }

    componentDidMount() {
        this.getSongsList();
    }

    selectedSong(url, id) {
        this.setState({
            currentPlaying: this.state.response['results'][id],
            secondScreenStatus: true,
            currentPlayingId: id
        },
            console.log("Selected song Url : " + url + " id :" + id + " current playing :" + this.state.currentPlaying)

        )
    }

    reLoadAudio() {
        let newSrc = this.state.currentPlaying['music_file'].url;
        var audioElement = "<audio controls style='width:100%' id='myAudio'> <source src=" + newSrc + " type='audio/mpeg' /> Your browser does not support the audio element. </audio>";
        $("#audio_container").append(audioElement);

    }

    previousSong() {
        $("#myAudio").remove();
        let current = this.state.currentPlayingId;


        if (current == 0) {
            alert("This is first song");

        }
        else {
            this.setState({
                currentPlaying: this.state.response['results'][current - 1],
                currentPlayingId: current - 1

            })

            let newSrc = this.state.response['results'][current - 1]['music_file'].url;
            var audioElement = "<audio controls style='width:100%' id='myAudio'> <source src=" + newSrc + " type='audio/mpeg' /> Your browser does not support the audio element. </audio>";
            $("#audio_container").append(audioElement);


        }

    }

    nextSong() {
        $("#myAudio").remove();
        let current = this.state.currentPlayingId;

        if (current == this.state.response['results'].length) {
            alert("this is last song");
        }
        else {
            this.setState({
                currentPlaying: this.state.response['results'][current + 1],
                currentPlayingId: current + 1


            })

            let newSrc = this.state.response['results'][current + 1]['music_file'].url;
            var audioElement = "<audio controls style='width:100%' id='myAudio'> <source src=" + newSrc + " type='audio/mpeg' /> Your browser does not support the audio element. </audio>";
            $("#audio_container").append(audioElement);
        }

    }

    goBack() {

        this.setState({
            secondScreenStatus: false
        })

    }

    

    

    render() {
        let generateList = [];
        let thumbnailStyle = {'height':'50px','width':'50px'}
        let titleInListViewStyle = {'position':'absolute', 'margin-left':'5px'}
        if (this.state.response['results']) {
            //console.log(this.state.response['results'][0].title);
            for (let i = 0; i < this.state.response['results'].length; i++) {
                                    generateList.push(<a href="#!" className="collection-item" onClick={this.selectedSong.bind(this, this.state.response['results'][i].link, i)}><div><img class="responsive-img" style={thumbnailStyle} src={this.state.response['results'][i].thumbnail} /> <span style={titleInListViewStyle}>{this.state.response['results'][i].title}</span></div></a>);
            }
        }

        let listStyle = { 'height': '300px', 'overflow-y': 'auto' }
        let audioStyle = { 'width': '100%' }
        let nextPrevButtonsStyle = { 'text-align': 'center' }
        let btnRadius = { 'border-radius': '50%', 'margin': '5px' }
        let btnBack = { 'z-index': '100', 'position': 'absolute' }
        

        return (
            <React.Fragment>

                <div className='row'>

                    {!this.state.secondScreenStatus &&

                        <div class="col s12 m7">
                            <div class="card">

                                <div class="card-content">

                                    <div style={listStyle}>
                                        <div className="collection">
                                            {generateList}
                                        </div>

                                    </div>

                                </div>
                            </div>








                            {/* <div className='col m6 s12' style={listStyle}>
                            <div className="collection">
                                {generateList}
                            </div> */}

                        </div>
                    }

                    {this.state.secondScreenStatus &&

                        <div class="col s12 m7">
                            <div class="card">
                                <a class="waves-effect waves-light btn" onClick={this.goBack} style={btnBack} ><i class="material-icons">arrow_back</i></a>

                                <div class="card-image">

                                    <img class="responsive-img" src={this.state.currentPlaying.thumbnail} />
                                    <span class="card-title">{this.state.currentPlaying.title}</span>
                                </div>
                                <div class="card-content">

                                    <div id='audio_container'>
                                        <audio controls id='myAudio' style={audioStyle}>
                                            <source src={this.state.currentPlaying['music_file'].url} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                         </audio>
                                    </div>

                                    <div style={nextPrevButtonsStyle}>
                                        <a class="waves-effect waves-light btn" style={btnRadius} onClick={this.previousSong}><i class="material-icons">chevron_left</i></a>
                                        <a class="waves-effect waves-light btn" style={btnRadius} onClick={this.nextSong}><i class="material-icons">chevron_right</i></a>
                                    </div>



                                </div>

                            </div>
                        </div>





                        /*   <div className='col m6 s12' style={listStyle}>
                              <img class="responsive-img" src={this.state.currentPlaying.thumbnail} />
                              {console.log(this.state.currentPlaying)}
                              <div id='audio_container'>
                                  <audio controls id='myAudio'>
                                      <source src={this.state.currentPlaying['music_file'].url} type="audio/mpeg" />
                                      Your browser does not support the audio element.
                                  </audio>
  
                              </div>
  
                              <a class="waves-effect waves-light btn" onClick={this.previousSong}>Previous</a>
                              <a class="waves-effect waves-light btn" onClick={this.nextSong}>Next</a>
  
                          </div> */

                    }

                </div>


            </React.Fragment>
        )
    }
}

class MainComponent extends React.Component {
    constructor(props) {
        super();

        this.state = {

            screenOneStatus: true

        }

    }



    render() {

        return (
            <React.Fragment>
                <div className='container'>
                    {this.state.screenOneStatus &&
                        <ScreenOne />
                    }
                </div>

            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <MainComponent />, document.getElementById("app")


);