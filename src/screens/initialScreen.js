import AntDesign from '@expo/vector-icons/AntDesign';
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

function initialScreen({ navigation }) {
    const fontePlayfairBold = { fontFamily: 'PlayfairDisplay-Bold' };

    const [cotacoes, setCotacoes] = useState({
        usd: { valor: 'R$ 0,00', variacao: 0 },
        usdt: { valor: 'R$ 0,00', variacao: 0 },
        cad: { valor: 'R$ 0,00', variacao: 0 },
        gbp: { valor: 'R$ 0,00', variacao: 0 },
        ars: { valor: 'R$ 0,00', variacao: 0 },
        btc: { valor: 'R$ 0,00', variacao: 0 },
        ltc: { valor: 'R$ 0,00', variacao: 0 },
        eur: { valor: 'R$ 0,00', variacao: 0 },
        jpy: { valor: 'R$ 0,00', variacao: 0 },
        chf: { valor: 'R$ 0,00', variacao: 0 },
        aud: { valor: 'R$ 0,00', variacao: 0 },
        cny: { valor: 'R$ 0,00', variacao: 0 },
        ils: { valor: 'R$ 0,00', variacao: 0 },
        eth: { valor: 'R$ 0,00', variacao: 0 },
        xrp: { valor: 'R$ 0,00', variacao: 0 },
        doge: { valor: 'R$ 0,00', variacao: 0 }
    });
    const [lastUpdate, setLastUpdate] = useState('--:--');
    const [loading, setLoading] = useState(false);

    function formatBrl(value) {
        const numberValue = Number(value);
        if (Number.isNaN(numberValue)) {
            return 'R$ --';
        }
        return numberValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function formatTime(value) {
        if (!value) {
            return '--:--';
        }
        const parsedDate = new Date(value.replace(' ', 'T'));
        if (Number.isNaN(parsedDate.getTime())) {
            return '--:--';
        }
        return parsedDate.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function formatVariation(value) {
        const numberValue = Number(value);

        if (Number.isNaN(numberValue)) {
            return '0,00%';
        }

        const absoluteFormatted = Math.abs(numberValue).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        if (numberValue > 0) {
            return <Text style={{ color: 'green', fontSize: 15 }}>+{absoluteFormatted}%</Text>;
        }

        if (numberValue < 0) {
            return <Text style={{ color: 'red', fontSize: 15 }}>-{absoluteFormatted}%</Text>;
        }

        return '0,00%';
    }

    function getVariationColor(value) {
        const numberValue = Number(value);

        if (numberValue > 0) {
            return '#2e7d32';
        }

        if (numberValue < 0) {
            return '#c62828';
        }

        return '#6b7280';
    }

    function getVariationIcon(value) {
        const numberValue = Number(value);
        if (numberValue > 0) {
            return <AntDesign name="caret-up" size={20} color="green" />;
        }
        if (numberValue < 0) {
            return <AntDesign name="caret-down" size={20} color="red" />;
        }
        return <AntDesign name="minus" size={20} color="black" />;
    }

    async function atualizaCotacoes() {
        try {
            setLoading(true);
            const response = await api.get('/last/USD-BRL,CAD-BRL,GBP-BRl,ARS-BRL,BTC-BRL,LTC-BRL,EUR-BRL,JPY-BRL,CHF-BRL,AUD-BRL,CNY-BRL,ILS-BRL,ETH-BRL,XRP-BRL,DOGE-BRL');
            const { USDBRL, CADBRL, GBPBRL, ARSBRL, BTCBRL, LTCBRL, EURBRL, JPYBRL, CHFBRL, AUDBRL, CNYBRL, ILSBRL, ETHBRL, XRPBRL, DOGEBRL } = response.data;
            setCotacoes({
                usd: { valor: formatBrl(USDBRL?.bid), variacao: Number(USDBRL?.pctChange ?? 0) },
                cad: { valor: formatBrl(CADBRL?.bid), variacao: Number(CADBRL?.pctChange ?? 0) },
                gbp: { valor: formatBrl(GBPBRL?.bid), variacao: Number(GBPBRL?.pctChange ?? 0) },
                ars: { valor: formatBrl(ARSBRL?.bid), variacao: Number(ARSBRL?.pctChange ?? 0) },
                btc: { valor: formatBrl(BTCBRL?.bid), variacao: Number(BTCBRL?.pctChange ?? 0) },
                ltc: { valor: formatBrl(LTCBRL?.bid), variacao: Number(LTCBRL?.pctChange ?? 0) },
                eur: { valor: formatBrl(EURBRL?.bid), variacao: Number(EURBRL?.pctChange ?? 0) },
                jpy: { valor: formatBrl(JPYBRL?.bid), variacao: Number(JPYBRL?.pctChange ?? 0) },
                chf: { valor: formatBrl(CHFBRL?.bid), variacao: Number(CHFBRL?.pctChange ?? 0) },
                aud: { valor: formatBrl(AUDBRL?.bid), variacao: Number(AUDBRL?.pctChange ?? 0) },
                cny: { valor: formatBrl(CNYBRL?.bid), variacao: Number(CNYBRL?.pctChange ?? 0) },
                ils: { valor: formatBrl(ILSBRL?.bid), variacao: Number(ILSBRL?.pctChange ?? 0) },
                eth: { valor: formatBrl(ETHBRL?.bid), variacao: Number(ETHBRL?.pctChange ?? 0) },
                xrp: { valor: formatBrl(XRPBRL?.bid), variacao: Number(XRPBRL?.pctChange ?? 0) },
                doge: { valor: formatBrl(DOGEBRL?.bid), variacao: Number(DOGEBRL?.pctChange ?? 0) }
            });
            setLastUpdate(
                new Date().toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            );
        } catch (error) {
            console.log('Erro ao atualizar cotações:', error);
        } finally {
            setLoading(false);
        }
    }
    
    const auth = getAuth();
    const fazerLogout = () => {
        signOut(auth).then(() => {
            navigation.navigate('login');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    useEffect(() => {
        atualizaCotacoes();
    }, []);

    return (
        <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: '#ffffff', alignItems: 'center' }}> {/* Container Principal */}
            {/* header blue */}
            <View style={{ backgroundColor: '#263466', height: 180, width: '100%', borderBottomRightRadius: 30, borderBottomLeftRadius: 30, alignItems: 'center' }}>
                {/* Header titulo */}
                <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
                    <Text style={[{ color: '#ffffff', fontSize: 34, textAlign: 'center', lineHeight: 34 }, fontePlayfairBold]}>Conversor de</Text>
                    <Text style={[{ color: '#ffffff', fontSize: 34, textAlign: 'center', lineHeight: 34 }, fontePlayfairBold]}>
                        Moedas <Text style={[{ color: '#ff8c00' }, fontePlayfairBold]}>Pro</Text>
                    </Text>
                </View>

                

            </View>

            <ScrollView contentContainerStyle={{ alignItems: 'center'}} style={{ width: '100%'}}>
                {/* Cotacao atual / card 01 */}
                <View style={{ backgroundColor: '#ffffff', width: 340, height: 80, marginTop: 15,  borderRadius: 15, justifyContent: 'center', alignItems: 'center', shadowRadius: 8 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cotação Atual</Text>
                    <Text style={{ fontSize: 15 }}>Ultima Atualização: {lastUpdate}</Text>
                </View>
            {/* USD/BRL Card 02 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, marginTop: 40, shadowRadius: 8 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/us.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>USD/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Dólar americano</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.usd.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.usd.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.usd.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.usd.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.usd.variacao)}</Text>
                    </View>
                </View>
            </View>

            {/* CAD/BRL Card 04 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/ca.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>CAD/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Dólar canadense</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.cad.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.cad.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.cad.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.cad.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.cad.variacao)}</Text>
                    </View>
                </View>
            </View>

            {/* GBP/BRL Card 05 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/gb.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>GBP/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Libra esterlina</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.gbp.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.gbp.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.gbp.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.gbp.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.gbp.variacao)}</Text>
                    </View>
                </View>
            </View>

            {/* ARS/BRL Card 06 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/ar.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ARS/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Peso argentino</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.ars.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.ars.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.ars.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.ars.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.ars.variacao)}</Text>
                    </View>
                </View>
            </View>

            {/* BTC/BRL Card 07 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/btc.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>BTC/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Bitcoin</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.btc.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.btc.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.btc.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.btc.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.btc.variacao)}</Text>
                    </View>
                </View>
            </View>

            {/* LTC/BRL Card 08 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/ltc.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>LTC/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Litecoin</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.ltc.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.ltc.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.ltc.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.ltc.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.ltc.variacao)}</Text>
                    </View>
                </View>
            </View>
            {/* EUR/BRL Card 09 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/eu.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>EUR/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Euro</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.eur.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.eur.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.eur.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.eur.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.eur.variacao)}</Text>
                    </View>
                </View>
            </View>

            {/* JPY/BRL Card 10 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/jp.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>JPY/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Iene japonês</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.jpy.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.jpy.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.jpy.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.jpy.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.jpy.variacao)}</Text>
                    </View>
                </View>
            </View>
            {/* CHF/BRL Card 11 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/ch.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>CHF/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Franco suíço</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.chf.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.chf.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.chf.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.chf.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.chf.variacao)}</Text>
                    </View>
                </View>
            </View>
            {/* AUD/BRL Card 12 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/au.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>AUD/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Dólar australiano</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.aud.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.aud.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.aud.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.aud.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.aud.variacao)}</Text>
                    </View>
                </View>
            </View>
            {/* CNY/BRL Card 13 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/cn.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>CNY/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Yuan chinês</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.cny.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.cny.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.cny.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.cny.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.cny.variacao)}</Text>
                    </View>
                </View>
            </View>
            {/* ILS/BRL Card 14 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/il.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ILS/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Novo shekel israelense</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.ils.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.ils.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.ils.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.ils.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.ils.variacao)}</Text>
                    </View>
                </View>
            </View>
            {/* ETH/BRL Card 15 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/eth.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ETH/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Ethereum</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.eth.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.eth.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.eth.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.eth.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.eth.variacao)}</Text>
                    </View>
                </View>
            </View>
            {/* XRP/BRL Card 16 */}
            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/xrp.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>XRP/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Ripple</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.xrp.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.xrp.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.xrp.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.xrp.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.xrp.variacao)}</Text>
                    </View>
                </View>
            </View>
            {/* DOGE/BRL Card 17 */}

            <View style={{ backgroundColor: '#ffffff', width: 340, height: 90, borderRadius: 15, shadowRadius: 8, marginTop: 11 }}>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginBottom: -25, marginTop: 20, marginLeft: 10, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/doge.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ height: 40, width: 40, borderRadius: 20, marginLeft: 30, overflow: 'hidden' }}>
                    <Image source={require('../../assets/images/br.png')} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ position: 'absolute', left: 83, top: 18 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>DOGE/BRL</Text>
                    <Text style={{ fontSize: 15 }}>1 Dogecoin</Text>
                </View>
                <View style={{ position: 'absolute', right: 12, top: 18 }}>
                    <Text style={{ alignItems: 'flex-end', fontSize: 18, fontWeight: 'bold' }}>{cotacoes.doge.valor}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2 }}>
                        <Text style={{ color: getVariationColor(cotacoes.doge.variacao), fontSize: 13, fontWeight: 'bold', marginRight: 4 }}>{getVariationIcon(cotacoes.doge.variacao)}</Text>
                        <Text style={{ color: getVariationColor(cotacoes.doge.variacao), fontSize: 13, fontWeight: 'bold' }}>{formatVariation(cotacoes.doge.variacao)}</Text>
                    </View>
                </View>
            </View>

            </ScrollView>

            {/* Atualizar Cotações / BUTTON */}
            <TouchableOpacity
                style={{ backgroundColor: '#4caf93', width: 340, height: 50, borderRadius: 30, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.4, shadowColor: '#f4a261' }}
                onPress={atualizaCotacoes}
                disabled={loading}
                activeOpacity={0.9}
            >
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19 }}>Atualizar Cotações</Text>
                    {loading ? (
                        <View style={{ position: 'absolute', right: 18, top: 0, bottom: 0, justifyContent: 'center' }}>
                            <ActivityIndicator size="small" color="#fff" />
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ backgroundColor: '#af2d2d', width: 340, height: 50, borderRadius: 30, marginTop: 15, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.4, shadowColor: '#f4a261' }}
                onPress={fazerLogout}
                disabled={loading}
                activeOpacity={0.9}
            >
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19 }}>Fazer Logout</Text>
                    {loading ? (
                        <View style={{ position: 'absolute', right: 18, top: 0, bottom: 0, justifyContent: 'center' }}>
                            <ActivityIndicator size="small" color="#fff" />
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>

        </View>
    )
};
export default initialScreen;