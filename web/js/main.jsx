import React from 'react';
import {Main} from './ui/main';

uibench.init('React', '0.13.3');

document.addEventListener('DOMContentLoaded', function(e) {
  var container = document.querySelector('#App');

  uibench.run(
      function(state) {
        React.render(<Main data={state}/>, container);
      },
      function(samples) {
        React.render(<pre>{JSON.stringify(samples, null, ' ')}</pre>, container);
      }
  );
});
