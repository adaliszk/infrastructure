_Infrastructure setup to deploy machines via a shared network using iPXE, Matchbox, and DNSmasq_

# On-Premise Manager
The idea is pretty simple: with each premise there should be a manager machine that gives
automation capabilities and external access in a secure way. Additionally, this machine 
could be used as a Proxy, allowing it to store any management configurations and only
allow it to work through this on-prem access.


## Quickstart
1. Make sure your Premise machine has `eth0` (internet) and `eth1` (vpc) interfaces
2. Update package links with `yarn`
3. Create a `.env` file with: `yarn premise start`
4. Run the deployment: `yarn premise deploy`
