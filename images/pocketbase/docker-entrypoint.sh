#!/usr/bin/env bash
# Copyright © 2023 by Ádám Liszkai using BSD 3-Clause License
# https://source.adaliszk.io/pocketbase/license

cat <<-WELCOME_MESSAGE

	THANK YOU FOR USING ADALISZK/POCKETBASE!

	PocketBase is under the MIT License: Copyright © 2022 - present, Gani Georgiev
	Container is under BSD 3-Clause: Copyright © 2023 by Ádám Liszkai

	Documentation: https://docs.adaliszk.io/pocketbase
	Source: https://github.com/adaliszk/infrastructure

	> PocketBase version: ${POCKET_VERSION}
	> Datadir: /data $(stat -c '(%u:%g with %A)' /data)
	> User: $(id)

WELCOME_MESSAGE

if [[ "${#POCKET_SECRET}" -ne "32" ]]; then
    POCKET_SECRET="$(echo $RANDOM | md5sum | head -c 32)"
    cat <<-SECRET_WARNING
		WARNING: POCKET_SECRET variable was not set or was not a 32 character string!
		Secret key was automatically generated: ${POCKET_SECRET}
		Please note down this value and set the POCKET_SECRET within your deployment to avoid loosing access to your data!
		SECRET_WARNING
    export POCKET_SECRET
    echo " "
fi

echo "> Preparing directories..."
mkdir -p "${DATA_DIR}" "${PUBLIC_DIR}" "${MIGRATION_DIR}"

echo "> Starting PocketBase..."
# shellcheck disable=SC2068
/opt/pocketbase \
  --encryptionEnv="POCKET_SECRET" \
  --dir="${DATA_DIR}" \
  --migrationsDir="${MIGRATION_DIR}" \
  --publicDir="${PUBLIC_DIR}" \
  $@
