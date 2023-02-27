> DEPRECATED: No longer in use, as it has been replaced with [CAPYBARA Cluster](../capybara)

# BEAVER Cluster

Typhoon-managed Kubernetes cluster using coreos machines hosted at [Netcup.de](netcup.de) (for 5€ voucher you can
use `36nc16192003780` at checkout). The installation is managed through Terraform, the overall architecture:

```mermaid
graph LR
    Cluster-->Management;
    Admin-->Management;
    User-->NGINX;

    subgraph Cluster
    direction TB
    ControlPlane1-->ETCD;
    ETCD[(ETCD)]

    NGINX-->Worker1;
    NGINX-->Worker2;
    NGINX-->Worker3;
    
    Worker1-->Storage1;
    Worker1-.->ControlPlane1;
    Storage1-->Longhorn;
    Storage1[(PV)]

    Worker2-->Storage2;
    Worker2-.->ControlPlane1;
    Storage2-->Longhorn;
    Storage2[(PV)]

    Worker3-->Storage3;
    Worker3-.->ControlPlane1;
    Storage3-->Longhorn;
    Storage3[(PV)]
    end

    subgraph Management
        direction TB
        DNS-->PremiseManager;
        NetworkBoot-->PremiseManager;
        Matchbox-->PremiseManager;
        SSH-->PremiseManager;
    end
```