#!/bin/bash
            
docker exec cli-org1 scripts/commit-dpr.sh
docker exec cli-org1 scripts/commit-CCDR.sh
# docker exec cli-org1 scripts/commit-activeCCDR.sh
# docker exec cli-org1 scripts/commit-passiveCCDR.sh
# docker exec cli-org1 scripts/commit-documents.sh
# docker exec cli-org1 scripts/commit-DRLDocs.sh
# docker exec cli-org1 scripts/commit-IGCAdmin.sh
# docker exec cli-org1 scripts/commit-License.sh
docker exec cli-org1 scripts/commit-Organization.sh
# docker exec cli-org1 scripts/commit-OrgAdmin.sh
# docker exec cli-org1 scripts/commit-Users.sh
# docker exec cli-org1 scripts/commit-Userprofile.sh
