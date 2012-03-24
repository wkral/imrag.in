#
# Author:: Seth Chisamore (<schisamo@opscode.com>)
# Cookbook Name:: python
# Attribute:: default
#
# Copyright 2011, Opscode, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

default['python']['distribute_install_py_version'] = '2.7'

default['python']['install_method'] = 'package'

default['python']['url'] = 'http://www.python.org/ftp/python'
default['python']['version'] = '2.7.2'
default['python']['checksum'] = '0ddfe265f1b3d0a8c2459f5bf66894c7'
default['python']['prefix_dir'] = '/usr/local'

default['python']['configure_options'] = %W{--prefix=#{python['prefix_dir']}}
