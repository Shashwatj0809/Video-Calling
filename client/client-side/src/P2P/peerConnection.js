class PeerService {
    constructor() {
      if (!this.peer) {
        this.peer = new RTCPeerConnection({
          iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
              ],
            },
          ],
        });
      }
    }
    async makeOffer(){
      if(this.peer){
        const offer=await this.peer.createOffer()
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      }
    }

    async acceptoffer(sendoffer){
      if(this.peer){
        await this.peer.setRemoteDescription(sendoffer);
        const ans=await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(ans));
        return ans;

      }
    }
    async settingOffer(ans){
      if(this.peer){
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    }

    
}
export default new PeerService();