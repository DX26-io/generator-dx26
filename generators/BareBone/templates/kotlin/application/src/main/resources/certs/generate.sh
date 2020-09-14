#!/usr/bin/env bash

# Changes these CN's to match your hosts in your environment if needed.
SERVER_CN=localhost
CLIENT_CN=localhost # Used when doing mutual TLS
PASSWORD=changeMe

openssl req -x509 -out $SERVER_CN.crt -keyout $SERVER_CN.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=${SERVER_CN}' -extensions EXT -config <( \
   printf "[dn]\nCN=${SERVER_CN}\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:${SERVER_CN}\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

openssl pkcs12 -export \
    -in $SERVER_CN.crt \
    -inkey $SERVER_CN.key \
    -name $SERVER_CN \
    -out $SERVER_CN.p12 \
    -passout pass:$PASSWORD
