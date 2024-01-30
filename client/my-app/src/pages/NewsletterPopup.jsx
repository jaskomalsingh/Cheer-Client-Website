import React from "react";


export const NewsletterPopup = () => {
    return (
        <div style={{ width: 594, height: 284, position: 'relative' }}>
            <div style={{ width: 579, height: 224, left: 0, top: 60, position: 'absolute', background: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
            <div style={{ width: 579, height: 50, left: 0, top: 10, position: 'absolute', background: '#D5B69A', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
            <div style={{ width: 356, left: 105, top: 120, position: 'absolute', textAlign: 'center', color: '#828282', fontSize: 18, fontFamily: 'Lato', fontWeight: '400', wordWrap: 'break-word' }}>Any weekly updates from our team will be sent to your inbox. All you have to do is enter your email to receive them! </div>
            <div style={{ width: 455, height: 62, left: 72, top: 198, position: 'absolute' }}>
                <div style={{ width: 381, height: 62, left: 0, top: 0, position: 'absolute' }}>
                    <div style={{ width: 381, height: 62, left: 0, top: 0, position: 'absolute', background: '#F4F4E7', borderRadius: 10 }} />
                    <div style={{ left: 35, top: 17, position: 'absolute', color: '#BDBDBD', fontSize: 24, fontFamily: 'Lato', fontWeight: '400', wordWrap: 'break-word' }}>email@email.com</div>
                </div>
                <div style={{ width: 62, height: 62, left: 393, top: 0, position: 'absolute', background: '#F4F4E7', borderRadius: 10 }} />
                <div style={{ width: 24, height: 24, left: 412, top: 21, position: 'absolute' }}>
                    <div style={{ width: 21, height: 18, left: 2, top: 3, position: 'absolute', background: '#747474' }}></div>
                    <div style={{ width: 24, height: 24, left: 0, top: 0, position: 'absolute' }}></div>
                </div>
            </div>
            <div style={{ width: 501, height: 49, left: 39, top: 60, position: 'absolute', textAlign: 'center', color: '#333333', fontSize: 40, fontFamily: 'Cabin', fontWeight: '600', wordWrap: 'break-word' }}>Subscribe to our Newsletter!</div>
            <div style={{ width: 30, height: 30, left: 564, top: 0, position: 'absolute', background: '#D87D56', borderRadius: 9999 }} />
            <div style={{ width: 12, height: 0, left: 575, top: 11, position: 'absolute', transform: 'rotate(45deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
            <div style={{ width: 12, height: 0, left: 575, top: 19.49, position: 'absolute', transform: 'rotate(-45deg)', transformOrigin: '0 0', border: '1px black solid' }}></div>
        </div>
    );
}