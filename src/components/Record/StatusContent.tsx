import {useTheme} from '@/context/ThemeContext';
import {useStatistics} from '@/hooks/useStatistics';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import BackHeader from '../Header/BackHeader';

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

export default function StatsContent() {
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();
  const {data, isLoading, error} = useStatistics();
  const colors = [
    '#FF5454',
    '#FCCD8C',
    '#FFF182',
    '#88C688',
    '#7BBCF3',
    '#7986C8',
    '#C893F1',
    '#FFBBEB',
    '#50505055',
  ];

  <BackHeader
    searchKeyword={t('기록')}
    onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
    onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
  />;

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

  console.log('불러온 통계 데이터:', data);

  return (
    <>
      <BackHeader
        searchKeyword={t('기록')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <View
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? '#000000' : '#F5F4F5'},
        ]}>
        <View style={styles.statsContainer}>
          <View style={styles.recordContainer}>
            {Object.entries(data.records).map(([category, count], index) => (
              <View key={category} style={styles.statRow}>
                <View
                  style={[
                    styles.colorBar,
                    {backgroundColor: colors[index % colors.length]},
                  ]}
                />
                <Text style={styles.statText}>
                  {t(categoryMap[category] || '기타')} : {Number(count)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.bookmarkContainer}>
            {Object.entries(data.bookmarks).map(([category, count], index) => (
              <View key={category} style={styles.statRow}>
                <View
                  style={[
                    styles.colorBar,
                    {backgroundColor: colors[index % colors.length]},
                  ]}
                />
                <Text style={styles.statText}>
                  {t(categoryMap[category] || '기타')} : {Number(count)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  statsContainer: {
    width: '100%',
  },
  recordContainer: {
    width: '100%',
    maxWidth: 500,
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  bookmarkContainer: {
    width: '100%',
    maxWidth: 500,
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  colorBar: {
    width: 30,
    height: 5,
    borderRadius: 3,
    marginRight: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});
