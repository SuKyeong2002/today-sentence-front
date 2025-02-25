import {useTheme} from '@/context/ThemeContext';
import {useStatistics} from '@/hooks/useStatistics';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import BackHeader from '../Header/BackHeader';
import Svg, {G, Path, Text as SvgText} from 'react-native-svg';
import {ScrollView} from 'react-native-gesture-handler';

// 카테고리 맵 타입 정의
const categoryMap: Record<string, string> = {
  POEM_NOVEL_ESSAY: '시/소설/에세이',
  ECONOMY_MANAGEMENT: '경제/경영',
  HISTORY_SOCIETY: '역사/사회',
  PHILOSOPHY_PSYCHOLOGY: '철학/심리학',
  SELF_DEVELOPMENT: '자기계발',
  ARTS_PHYSICAL: '예체능',
  KID_YOUTH: '아동/청소년',
  TRAVEL_CULTURE: '여행/문화',
  ETC: '기타',
};

// 데이터 타입 정의
type CategoryCount = Record<string, number>;

// 원형 차트 컴포넌트 props 타입 정의
interface PieChartProps {
  data: CategoryCount;
  colors: string[];
}

// 범례 컴포넌트 props 타입 정의
interface LegendProps {
  data: CategoryCount;
  colors: string[];
}

// 원형 차트 컴포넌트
const PieChart: React.FC<PieChartProps> = ({data, colors}) => {
  const total: number = Object.values(data).reduce(
    (sum, value) => sum + Number(value),
    0,
  );
  let startAngle: number = 0;
  const radius: number = 80;
  const centerX: number = 150;
  const centerY: number = 150;

  return (
    <View style={styles.chartContainer}>
      <Svg height="300" width="300" viewBox="0 0 300 300">
        <G>
          {Object.entries(data).map(([category, count], index) => {
            const percentage: number = Number(count) / total;
            const angle: number = percentage * 360;
            const endAngle: number = startAngle + angle;

            // 원호의 좌표 계산
            const x1: number =
              centerX + radius * Math.cos(((startAngle - 90) * Math.PI) / 180);
            const y1: number =
              centerY + radius * Math.sin(((startAngle - 90) * Math.PI) / 180);
            const x2: number =
              centerX + radius * Math.cos(((endAngle - 90) * Math.PI) / 180);
            const y2: number =
              centerY + radius * Math.sin(((endAngle - 90) * Math.PI) / 180);

            // 라벨 위치 계산 (원의 중간 지점)
            const labelAngle: number = startAngle + angle / 2;
            const labelRadius: number = radius * 0.7;
            const labelX: number =
              centerX +
              labelRadius * Math.cos(((labelAngle - 90) * Math.PI) / 180);
            const labelY: number =
              centerY +
              labelRadius * Math.sin(((labelAngle - 90) * Math.PI) / 180);

            // 큰 원호일 경우에만 라벨 표시 (5% 이상)
            const showLabel: boolean = percentage >= 0.05;

            const sweepFlag: number = 1; // 시계 방향
            const largeArcFlag: number = angle > 180 ? 1 : 0;

            const pathData: string = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z`;

            const result = (
              <G key={category}>
                <Path d={pathData} fill={colors[index % colors.length]} />
                {showLabel && (
                  <SvgText
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#fff"
                    fontWeight="bold">
                    {Math.round(percentage * 100)}%
                  </SvgText>
                )}
              </G>
            );

            startAngle += angle;
            return result;
          })}
        </G>
      </Svg>
    </View>
  );
};

// 범례 컴포넌트
const Legend: React.FC<LegendProps> = ({data, colors}) => {
  const {isDarkMode, theme} = useTheme();
  const total: number = Object.values(data).reduce(
    (sum, value) => sum + Number(value),
    0,
  );

  return (
    <View style={styles.legendContainer}>
      {Object.entries(data).map(([category, count], index) => {
        const percentage: string = ((Number(count) / total) * 100).toFixed(1);
        return (
          <View key={category} style={styles.legendItem}>
            <View
              style={[
                styles.colorSquare,
                {backgroundColor: colors[index % colors.length]},
              ]}
            />
            <Text
              style={[
                styles.legendText,
                {
                  color: isDarkMode ? 'white' : 'text',
                  fontFamily: theme.fontFamily,
                },
              ]}>
              {categoryMap[category] || '기타'} : {count}
              {/* {categoryMap[category] || '기타'}: {percentage}% ({count}) */}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const StatsContent: React.FC = () => {
  const {isDarkMode, theme} = useTheme();
  const {t} = useTranslation();
  const {data, isLoading, error} = useStatistics();
  const colors: string[] = [
    '#FF0000',
    '#F48F03',
    '#E8CE00',
    '#3AA031',
    '#006FD1',
    '#001FBC',
    '#9000FF',
    '#FF00B2',
    '#8A715D',
  ];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8A715D" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {t('데이터를 불러올 수 없습니다.')}
        </Text>
      </View>
    );
  }

  return (
    <>
      <BackHeader
        searchKeyword={t('기록')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ScrollView
        style={{
          backgroundColor: isDarkMode ? '#000000' : '#F5F4F5',
        }}
        contentContainerStyle={styles.container}>
        <View style={styles.statsContainer}>
          {/* 기록 통계 */}
          <View
            style={[
              styles.categorySection,
              {
                backgroundColor: isDarkMode ? '#2B2B2B' : 'white',
              },
            ]}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDarkMode ? 'white' : 'text',
                  fontFamily: theme.fontFamily,
                },
              ]}>
              {t('기록한 카테고리')}
            </Text>
            <View style={styles.chartContainer}>
              <View style={styles.chartSection}>
                <PieChart data={data.records} colors={colors} />
                <View style={styles.chartSection2}>
                  <Legend data={data.records} colors={colors} />
                </View>
              </View>
            </View>
          </View>

          {/* 북마크 통계 */}
          <View
            style={[
              styles.categorySection,
              {
                backgroundColor: isDarkMode ? '#2B2B2B' : 'white',
              },
            ]}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDarkMode ? 'white' : 'text',
                },
              ]}>
              {t('저장한 카테고리')}
            </Text>
            <View style={styles.chartSection}>
              <PieChart data={data.bookmarks} colors={colors} />
              <View style={styles.chartSection2}>
                <Legend data={data.bookmarks} colors={colors} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

// 스타일
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  statsContainer: {},
  categorySection: {
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  chartSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -60,
  },
  chartSection2: {
    flexDirection: 'row',
    marginLeft: -40,
  },
  chartContainer: {
    flexDirection: 'row',
  },
  legendContainer: {
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  colorSquare: {
    width: 10,
    height: 5,
    borderRadius: 3,
    marginRight: 10,
    marginVertical: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default StatsContent;
