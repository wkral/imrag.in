git "nosy" do
    repository "https://github.com/wkral/Nosy.git"
    reference "master"
    destination File.join(node.base.home_dir, node.nosy.dir)
    action :sync
    user node.base.user
    group node.base.group
end

template File.join(node.base.home_dir, "bin/nosy") do
    owner node.base.user
    group node.base.group
    mode "0755"
    source "nosy-shell.erb"
end
