"use client";

import Script from "next/script";

const SmartsuppWidget = () => {
  const key = process.env.NEXT_PUBLIC_SMARTSUPP_KEY;

  if (!key) return null;

  return (
    <Script id="smartsupp-widget" strategy="lazyOnload">
      {`
        var _smartsupp = _smartsupp || {};
        _smartsupp.key = '${key}';
        window.smartsupp || (function (d) {
          var s, c, o = window.smartsupp = function () { o._.push(arguments) };
          o._ = [];
          s = d.getElementsByTagName('script')[0];
          c = d.createElement('script');
          c.type = 'text/javascript';
          c.charset = 'utf-8';
          c.async = true;
          c.src = 'https://www.smartsuppchat.com/loader.js?';
          s.parentNode.insertBefore(c, s);
        })(document);
      `}

      {/* <!-- Smartsupp Live Chat script -->
<script type="text/javascript">
var _smartsupp = _smartsupp || {};
_smartsupp.key = '1cb80f5a1de6879e0a2b0cb8dceb798ee8ddbb48';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
</script> */}
      <noscript>
        Powered by{" "}
        <a href="https://www.smartsupp.com" target="_blank">
          Smartsupp
        </a>
      </noscript>
    </Script>
  );
};

export default SmartsuppWidget;
