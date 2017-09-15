import React from 'react';
export default class CampaignGaugeContainer extends React.PureComponent{
  constructor(props){
        super(props);
        this.state= {imageUri : ""}
        this.CropImage = this.CropImage.bind(this);
        this.LoadImage = this.LoadImage.bind(this);
    }
    CropImage(image){
        debugger;
        var width = 425;
        var height = 475;
        var x = 200;
        var y = 100;

        var tnCanvas = document.createElement('canvas');
        tnCanvas.style.cssText = "display:none;";
        var tnCanvasContext = tnCanvas.getContext('2d');
        tnCanvas.width = width;
        tnCanvas.height = height;
        var bufferCanvas = document.createElement('canvas');
        bufferCanvas.style.cssText = "display:none;";
        bufferCanvas.width = image.width;
        bufferCanvas.height = image.height;
        var bufferContext = bufferCanvas.getContext('2d');
        bufferContext.drawImage(image, 0, 0);
        tnCanvasContext.drawImage(bufferCanvas, x, y , width, height, 0, 0, width, height);
        var dataUri = tnCanvas.toDataURL();
        this.setState({

            imageUri : dataUri
        });
    }
    LoadImage(image){
            debugger;
            var closure = this;
            var loadTimer;
            if(loadTimer != null){
                clearTimeout(loadTimer);
            }
            if(!image.complete){
                
                loadTimer = setTimeout(function(){
                    closure.LoadImage(image);
                }, 3);
            }else{
                    closure.CropImage(image);
            }
        }
    componentDidMount(){
        var originalimage = new Image();
         originalimage.src = this.props.url
         originalimage.onLoad = this.LoadImage(originalimage);
    }

    render(){
        return(
            <div>
                <div>
                    <img style={{width: "100%"}} src={this.props.bannerUrl} />
                </div>
                <div style={{maxHeight:475, overflow: "hidden"}}>
                    <a href={this.props.imageLink} target="_blank">
                    {this.state.imageUri ? <img src={this.state.imageUri} style={{maxHeight:540, width: "100%", maxWidth: 350}} /> : null}
                    </a>
                </div>
            </div>

        );
    }
}