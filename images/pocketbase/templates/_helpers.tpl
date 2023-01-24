{{- define "pocketbase.fullname" -}}
{{ .Release.Name }}-pocketbase
{{- end }}

{{- define "pocketbase.hostname" -}}
pocketbase.{{ default .Values.ingress.hostname .Values.global.ingressHostname }}
{{- end }}

{{- define "pocketbase.selectorLabels" }}
release: {{ .Release.Name | quote }}
service: "backend"
{{- end }}

{{- define "pocketbase.labels" }}
stack: "pocketbase"
type: "backend"
{{- end }}

{{- define "pocketbase.annotations" }}
adaliszk.io/chart: "pocketbase"
adaliszk.io/type: "backend"
{{- end }}

{{- define "pocketbase.storageClass" -}}
{{ default .Values.persistence.storageClass .Values.global.storageClass }}
{{- end }}

{{- define "pocketbase.storageSize" -}}
{{ .Values.persistence.size }}
{{- end }}

{{- define "pocketbase.image" -}}
{{ .Values.image.registry }}/{{ .Values.image.repository }}/{{ .Values.image.name }}:{{ .Values.image.tag }}
{{- end }}

{{- define "pocketbase.imagePullPolicy" -}}
{{ default .Values.global.imagePullPolicy .Values.image.pullPolicy }}
{{- end }}

{{- define "pocketbase.encryption.secret" -}}
{{ default (include "pocketbase.fullname" .) .Values.encryption.secretName }}
{{- end }}

{{- define "pocketbase.encryption.secretKey" -}}
{{ default "encryption-key" .Values.encryption.secretKey }}
{{- end }}

{{- define "pocketbase.encryption.key" -}}
{{ default (randAlphaNum 32) .Values.encryption.key }}
{{- end }}