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
