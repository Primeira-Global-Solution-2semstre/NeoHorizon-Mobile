import React, { useContext } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DetritosContext } from '../context/DetritosContext';
import type { RootStackParamList } from '../types/domain';
import MetricCard from '../components/MetricCard';
import { colors } from '../styles/theme';
import styles from '../styles/screens/HomeScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const bannerImage = require('../../assets/orbital-banner.jpg');

const debrisPoints = [
  { top: '18%', left: '28%', color: colors.primary },
  { top: '24%', left: '64%', color: colors.warning },
  { top: '34%', left: '76%', color: colors.success },
  { top: '42%', left: '18%', color: colors.primary },
  { top: '57%', left: '70%', color: colors.warning },
  { top: '68%', left: '31%', color: colors.secondary },
  { top: '73%', left: '58%', color: colors.primary },
  { top: '48%', left: '48%', color: colors.success },
] as const;

type NavItem = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  screen: 'Home' | 'Detritos' | 'Alertas' | 'CadastroDetrito';
  badge?: number;
};

const HomeScreen = ({ navigation }: Props) => {
  const context = useContext(DetritosContext);
  const { metrics, alertas, detritos } = context!;
  const { width } = useWindowDimensions();
  const isCompact = width < 760;
  const isNarrow = width < 1180;
  const isWide = width >= 1600;
  const isUltraWide = width >= 2560;

  const navItems: NavItem[] = [
    { label: 'Visao geral', icon: 'view-dashboard-outline', screen: 'Home' },
    { label: 'Detritos', icon: 'satellite-variant', screen: 'Detritos' },
    { label: 'Alertas', icon: 'bell-outline', screen: 'Alertas', badge: metrics.totalAlertas },
    { label: 'Novo registro', icon: 'plus-circle-outline', screen: 'CadastroDetrito' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.shell, isCompact && styles.shellCompact]}>
        <View style={[styles.sidebar, isWide && styles.sidebarWide, isUltraWide && styles.sidebarUltraWide, isCompact && styles.sidebarCompact]}>
          <View style={styles.sidebarBrand}>
            <View style={styles.brandMark}>
              <MaterialCommunityIcons name="orbit" size={26} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.brandTitle}>NeoHorizon</Text>
              <Text style={styles.brandSubtitle}>ORBITAL INTEL</Text>
            </View>
          </View>

          <View style={styles.navList}>
            {navItems.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.navItem, index === 0 && styles.navItemActive]}
                onPress={() => navigation.navigate(item.screen)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={20}
                  color={index === 0 ? colors.primary : colors.muted}
                />
                <Text style={[styles.navText, index === 0 && styles.navTextActive]}>{item.label}</Text>
                {item.badge ? (
                  <View style={styles.navBadge}>
                    <Text style={styles.navBadgeText}>{item.badge}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.content,
            isWide && styles.contentWide,
            isUltraWide && styles.contentUltraWide,
            isCompact && styles.contentCompact,
          ]}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={bannerImage}
            style={[styles.banner, isWide && styles.bannerWide, isUltraWide && styles.bannerUltraWide, isCompact && styles.bannerCompact]}
            imageStyle={styles.bannerImage}
          >
            <View style={[styles.bannerOverlay, isWide && styles.bannerOverlayWide, isCompact && styles.bannerOverlayCompact]}>
              <Text style={styles.bannerKicker}>MONITORAMENTO EM TEMPO REAL</Text>
              <Text style={[
                styles.bannerTitle,
                isWide && styles.bannerTitleWide,
                isUltraWide && styles.bannerTitleUltraWide,
                isCompact && styles.bannerTitleCompact,
              ]}>Rastreamento de detritos orbitais</Text>
              <Text style={[styles.bannerText, isWide && styles.bannerTextWide]}>
                Seguranca orbital, catalogacao de objetos e alertas de aproximacao em uma interface elegante.
              </Text>
            </View>
          </ImageBackground>

          <View style={[styles.metricsRow, isCompact && styles.metricsRowCompact]}>
            <MetricCard label="Detritos monitorados" value={metrics.totalDetritos.toString()} accent={colors.primary} />
            <MetricCard label="Alertas ativos" value={metrics.totalAlertas.toString()} accent={colors.secondary} />
          </View>

          <View style={[styles.orbitalSection, isNarrow && styles.orbitalSectionCompact]}>
            <View style={[styles.mapCard, isWide && styles.mapCardWide, isUltraWide && styles.mapCardUltraWide]}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Mapa orbital</Text>
                  <Text style={styles.sectionDescription}>
                    Globo simplificado com orbitas discretas e detritos luminosos.
                  </Text>
                </View>
                <Text style={styles.liveBadge}>LIVE</Text>
              </View>

              <View style={[styles.orbitalMap, isWide && styles.orbitalMapWide, isUltraWide && styles.orbitalMapUltraWide]}>
                <View style={[styles.orbitLine, styles.orbitLineOne]} />
                <View style={[styles.orbitLine, styles.orbitLineTwo]} />
                <View style={[styles.orbitLine, styles.orbitLineThree]} />
                <View style={[styles.globe, isWide && styles.globeWide, isUltraWide && styles.globeUltraWide]}>
                  <View style={[styles.globeGlow, isWide && styles.globeGlowWide, isUltraWide && styles.globeGlowUltraWide]} />
                  <View style={[styles.globeMeridian, isWide && styles.globeMeridianWide, isUltraWide && styles.globeMeridianUltraWide]} />
                  <View style={[
                    styles.globeMeridian,
                    styles.globeMeridianTilt,
                    isWide && styles.globeMeridianWide,
                    isUltraWide && styles.globeMeridianUltraWide,
                  ]} />
                  <View style={[styles.globeEquator, isWide && styles.globeEquatorWide, isUltraWide && styles.globeEquatorUltraWide]} />
                </View>
                {debrisPoints.map((point, index) => (
                  <View
                    key={`${point.top}-${point.left}`}
                    style={[
                      styles.debrisPoint,
                      { top: point.top, left: point.left, backgroundColor: point.color },
                      index % 3 === 0 && styles.debrisPointLarge,
                    ]}
                  />
                ))}
              </View>

              <View style={styles.legendRow}>
                <Text style={styles.legendText}>LEO</Text>
                <Text style={styles.legendText}>MEO</Text>
                <Text style={styles.legendText}>GEO</Text>
                <Text style={styles.legendText}>{detritos.length} objetos</Text>
              </View>
            </View>

            <View style={[styles.cardLarge, isWide && styles.cardLargeWide]}>
              <Text style={styles.sectionTitle}>Proxima aproximacao</Text>
              <Text style={styles.sectionValue}>{metrics.proximidadeRisco}</Text>
              <Text style={styles.sectionDescription}>
                Avaliacao da janela orbital e recomendacoes para prevencao de colisoes.
              </Text>
            </View>
          </View>

          <View style={styles.statusCard}>
            <Text style={styles.sectionTitle}>Indicadores orbitais</Text>
            {Object.entries(metrics.porRegiao).map(([regiao, total]) => (
              <View style={styles.statusRow} key={regiao}>
                <Text style={styles.statusLabel}>{regiao}</Text>
                <Text style={styles.statusValue}>{total} detritos</Text>
              </View>
            ))}
          </View>

          <View style={styles.alertCard}>
            <Text style={styles.sectionTitle}>Alertas criticos</Text>
            {alertas.length ? (
              alertas.slice(0, 3).map((alerta) => (
                <View key={alerta.id} style={styles.alertRow}>
                  <Text style={styles.alertName}>{alerta.nome}</Text>
                  <Text style={styles.alertBadge}>{alerta.nivel}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.sectionDescription}>Nenhum alerta critico encontrado. A orbita esta estavel.</Text>
            )}
          </View>

          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Alertas')}>
            <Text style={styles.linkText}>Ver todos os alertas criticos</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <View style={styles.footerBrand}>
              <MaterialCommunityIcons name="orbit" size={24} color={colors.primary} />
              <Text style={styles.footerLogo}>NeoHorizon</Text>
            </View>
            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => navigation.navigate('Detritos')}>
                <Text style={styles.footerLink}>Detritos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Alertas')}>
                <Text style={styles.footerLink}>Alertas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CadastroDetrito')}>
                <Text style={styles.footerLink}>Novo registro</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.copyright}>Copyright 2026 NeoHorizon. Todos os direitos reservados.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;