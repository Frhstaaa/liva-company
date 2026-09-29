import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Server,
    CheckCircle2,
    Copy,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Cpu,
    Zap,
    FileCode,
    Check,
    RefreshCw,
    Play,
    Radio
} from 'lucide-react';

export default function FhirBpjsSimulator() {
    const [activeFlow, setActiveFlow] = useState('satusehat_encounter');
    const [copied, setCopied] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationCompleted, setSimulationCompleted] = useState(false);
    const [latency, setLatency] = useState('42 ms');

    const fhirPayloads = {
        satusehat_patient: {
            title: '1. Verifikasi Identitas Pasien (SATUSEHAT Patient Resource)',
            standard: 'HL7 FHIR R4 • Kemenkes DTO',
            method: 'GET',
            endpoint: 'https://api-satusehat.kemkes.go.id/fhir-r4/v1/Patient?identifier=https://fhir.kemkes.go.id/id/nik|3171012304900001',
            status: '200 OK',
            defaultLatency: '38 ms',
            json: {
                resourceType: "Patient",
                id: "10000004-9821-4f81-a3f1-0982736451a0",
                identifier: [
                    {
                        system: "https://fhir.kemkes.go.id/id/nik",
                        value: "3171012304900001"
                    },
                    {
                        system: "https://fhir.kemkes.go.id/id/ihs-number",
                        value: "P00192837465"
                    }
                ],
                active: true,
                name: [{ use: "official", text: "Dr. Hendra Gunawan, Sp.PD" }],
                gender: "male",
                birthDate: "1985-06-14"
            }
        },
        satusehat_encounter: {
            title: '2. Kunjungan Rawat Jalan (SATUSEHAT Encounter Resource)',
            standard: 'HL7 FHIR R4 • Interoperabilitas Otomatis',
            method: 'POST',
            endpoint: 'https://api-satusehat.kemkes.go.id/fhir-r4/v1/Encounter',
            status: '201 Created',
            defaultLatency: '54 ms',
            json: {
                resourceType: "Encounter",
                status: "in-progress",
                class: {
                    system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                    code: "AMB",
                    display: "ambulatory (rawat jalan)"
                },
                subject: {
                    reference: "Patient/10000004-9821-4f81-a3f1-0982736451a0",
                    display: "Budi Santoso"
                },
                participant: [
                    {
                        individual: {
                            reference: "Practitioner/N10029384",
                            display: "dr. Ratna Sp.JP"
                        }
                    }
                ],
                period: {
                    start: "2026-09-29T10:15:00+07:00"
                },
                serviceProvider: {
                    reference: "Organization/RS-LIVA-001",
                    display: "RS Mitra Sehat Liva SIMRS"
                }
            }
        },
        satusehat_condition: {
            title: '3. Rekam Medis & Diagnosis (SATUSEHAT Condition Resource)',
            standard: 'ICD-10 Kemenkes Verified • SNOMED-CT',
            method: 'POST',
            endpoint: 'https://api-satusehat.kemkes.go.id/fhir-r4/v1/Condition',
            status: '201 Created',
            defaultLatency: '46 ms',
            json: {
                resourceType: "Condition",
                clinicalStatus: {
                    coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }]
                },
                category: [
                    {
                        coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "encounter-diagnosis" }]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://hl7.org/fhir/sid/icd-10",
                            code: "I10",
                            display: "Essential (primary) hypertension"
                        }
                    ]
                },
                subject: {
                    reference: "Patient/10000004-9821-4f81-a3f1-0982736451a0"
                },
                encounter: {
                    reference: "Encounter/ENC-20260929-0091"
                }
            }
        },
        bpjs_vclaim: {
            title: '4. Penerbitan Surat Eligibilitas Peserta (SEP BPJS VClaim 2.0)',
            standard: 'BPJS Trust Mark • Antrean Online v2.0',
            method: 'POST',
            endpoint: 'https://apijkn.bpjs-kesehatan.go.id/vclaim-rest/SEP/2.0/insert',
            status: '200 OK (SEP Generated)',
            defaultLatency: '72 ms',
            json: {
                metadata: { code: "200", message: "Sukses Terbit SEP Otomatis" },
                response: {
                    sep: {
                        noSep: "0192R0010926V000124",
                        tglSep: "2026-09-29",
                        jnsPelayanan: "Rawat Jalan (Poli Penyakit Dalam)",
                        peserta: {
                            noKartu: "0001234567891",
                            nama: "BUDI SANTOSO",
                            jnsPeserta: "PBI APBN / KIS",
                            hakKelas: "Kelas 3"
                        },
                        poli: "PENYAKIT DALAM",
                        diagnosa: "I10 - Essential Hypertension",
                        catatan: "Bridging Real-time Liva SIMRS Engine"
                    }
                }
            }
        }
    };

    const currentData = fhirPayloads[activeFlow];

    const handleSwitchFlow = (flowId) => {
        setActiveFlow(flowId);
        setSimulationCompleted(false);
        const randomMs = Math.floor(Math.random() * 25) + 30;
        setLatency(`${randomMs} ms`);
    };

    const runPingSimulation = () => {
        setIsSimulating(true);
        setSimulationCompleted(false);
        setTimeout(() => {
            const randomMs = Math.floor(Math.random() * 20) + 26;
            setLatency(`${randomMs} ms`);
            setIsSimulating(false);
            setSimulationCompleted(true);
        }, 600);
    };

    const copyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(currentData.json, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#0F172A] rounded-2xl border border-slate-800 text-slate-100 shadow-xl overflow-hidden font-sans">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider">
                            INTEROPERABILITAS SATUSEHAT &amp; BPJS
                        </span>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-xs text-slate-400 font-mono">Zero-Plugin Direct API</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                        Live API &amp; FHIR R4 Interoperability Simulator
                    </h3>
                    <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                        Uji coba simulasi pertukaran data JSON resmi Kemenkes RI dan BPJS Kesehatan secara real-time dengan enkripsi end-to-end.
                    </p>
                </div>

                {/* Step Flow Selector Buttons */}
                <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
                    <button
                        type="button"
                        onClick={() => handleSwitchFlow('satusehat_patient')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer btn-spring ${
                            activeFlow === 'satusehat_patient'
                                ? 'bg-[#2F8BFF] text-white font-bold shadow-md shadow-blue-500/25 scale-[1.02]'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        1. Patient NIK
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSwitchFlow('satusehat_encounter')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer btn-spring ${
                            activeFlow === 'satusehat_encounter'
                                ? 'bg-[#2F8BFF] text-white font-bold shadow-md shadow-blue-500/25 scale-[1.02]'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        2. Encounter FHIR
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSwitchFlow('satusehat_condition')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer btn-spring ${
                            activeFlow === 'satusehat_condition'
                                ? 'bg-[#2F8BFF] text-white font-bold shadow-md shadow-blue-500/25 scale-[1.02]'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        3. Condition ICD-10
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSwitchFlow('bpjs_vclaim')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer btn-spring ${
                            activeFlow === 'bpjs_vclaim'
                                ? 'bg-[#FF8A2B] text-white font-bold shadow-md shadow-orange-500/25 scale-[1.02]'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                    >
                        4. SEP BPJS VClaim
                    </button>
                </div>
            </div>

            {/* Terminal View */}
            <div className="p-5 sm:p-6 bg-slate-950/80 space-y-4 font-mono text-xs">
                {/* Method & Endpoint Header Bar */}
                <div key={`header-${activeFlow}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 animate-scale-in">
                    <div className="flex items-center gap-2.5 truncate">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            currentData.method === 'GET' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                            {currentData.method}
                        </span>
                        <span className="text-slate-300 truncate text-[11.5px]">
                            {currentData.endpoint}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {currentData.status}
                        </span>
                        <span className="text-slate-700">|</span>
                        <span className="text-slate-300 text-[11px] flex items-center gap-1">
                            <Zap className="h-3 w-3 text-amber-400" />
                            {latency}
                        </span>
                        <button
                            type="button"
                            onClick={runPingSimulation}
                            disabled={isSimulating}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10.5px] flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer btn-spring"
                            title="Simulasi Ping Endpoint"
                        >
                            <RefreshCw className={`h-3 w-3 ${isSimulating ? 'animate-spin text-[#2F8BFF]' : 'text-slate-400'}`} />
                            <span>{isSimulating ? 'Memverifikasi...' : 'Uji Handshake'}</span>
                        </button>
                    </div>
                </div>

                {/* JSON Payload Code Block */}
                <div key={`code-${activeFlow}`} className="relative group animate-scale-in">
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                        {simulationCompleted && (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 animate-scale-in">
                                Payload Verified
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={copyJson}
                            className="px-2.5 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1.5 border border-slate-700 transition-all duration-150 cursor-pointer btn-spring shadow-xs"
                        >
                            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                            <span>{copied ? 'Tersalin' : 'Copy JSON'}</span>
                        </button>
                    </div>

                    <pre className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 overflow-x-auto text-[11.5px] leading-relaxed max-h-72">
                        <code>{JSON.stringify(currentData.json, null, 2)}</code>
                    </pre>
                </div>

                {/* Bottom Status Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-300 hover:border-slate-700 transition-colors">
                        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span className="text-[11px]">Enkripsi AES-256 GCM Payload</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-300 hover:border-slate-700 transition-colors">
                        <Server className="h-4 w-4 text-[#2F8BFF] shrink-0" />
                        <span className="text-[11px]">Auto Retry Exponential Backoff</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-300 hover:border-slate-700 transition-colors">
                        <FileCode className="h-4 w-4 text-[#FF8A2B] shrink-0" />
                        <span className="text-[11px]">Audit Trail Logged &amp; Immutable</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

