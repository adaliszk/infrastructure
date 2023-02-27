> DEPRECATED: No longer in use, as it has been replaced with [BEAVER Cluster](../beaver)

# ALPACA Cluster

Rancher-managed Kubernetes cluster using debian machines hosted at [Netcup.de](netcup.de) (for 5€ voucher you can
use `36nc16192003780` at checkout). The installation was manually done, the overall architecture:

```mermaid
graph TB
    NFS[(NFS\nPV)];
    Admin-->Rancher;
    User-->NGINX;

    subgraph Cluster
    ControlPlane1-.->Rancher;
    ControlPlane1-->ETCD;
    ETCD[(ETCD)]
    Worker1-.->Rancher;
    Worker1-->NFS;
    Worker2-.->Rancher;
    Worker2-->NFS;
    NGINX-->Worker1;
    NGINX-->Worker2;
    end
```