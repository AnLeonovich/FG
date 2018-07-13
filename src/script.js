import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import $ from 'jquery';
require('jquery-ui');
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/widgets/draggable');
require('jquery-ui/ui/disable-selection');
import _ from 'lodash';

import { HomePage } from './screens/home/home'
new HomePage();
