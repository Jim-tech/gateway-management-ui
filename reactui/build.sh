#!/bin/bash

# Fail on error & be verbose
set -e
set -v


# Bundle source for Release SidePackage
# zip -r reactUI_src.zip * -x \*.git\* build.sh node_modules/\* \*.zip

# Install
# npm install
gulp build

rm -rf /opt/siliconlabs/zigbeegateway/gateway-management-ui/reactui/dist
mv dist /opt/siliconlabs/zigbeegateway/gateway-management-ui/reactui/

# Collect results
# cd dist
# zip -r ../reactUI.zip *


# Cleanup files from last build
# rm -rf dist
