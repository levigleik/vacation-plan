'use client'
import { PrintSummaryDashboardProps } from '@/app/(private)/(dashboard)/components/summary/types'
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { format } from 'date-fns'
import { UserApiProps } from '@/types/models/user'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 40,
    gap: 10,
    color: '#0a4052',
    fontSize: 12,
  },
  section: {
    border: '1px solid #0a4052',
    borderRadius: 10,
  },
  innerSection: {
    padding: 30,
    gap: 20,
  },
  headerSection: {
    backgroundColor: '#0a4052',
    height: 18,
    width: '100%',
    borderRadius: 10,
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: '50%',
  },
  sectionMonth: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 10,
  },
  sectionParticipants: {
    border: '1px solid #0a4052',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  participantsPair: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 10,
    width: '100%',
  },
  participants: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textMonth: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textHoliday: {
    fontSize: 40,
    color: '#555',
  },
  textTitle: {
    fontSize: 30,
  },
})

export const PrintSummaryDashboard = ({
  vacation,
}: PrintSummaryDashboardProps) => {
  if (!vacation?.dates?.length) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No dates found</Text>
        </Page>
      </Document>
    )
  }
  const userPart1 = vacation.users?.slice(vacation.users.length / 2)
  const userPart2 = vacation.users?.slice(0, vacation.users.length / 2)

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.sectionMonth}>
          <Text style={styles.textMonth}>
            {format(vacation.dates?.[0]?.date, 'MMMM')}
          </Text>
          <Text>2024</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.headerSection} />
          <View style={styles.innerSection}>
            <Text style={styles.textHoliday}>HOLIDAY PLANNER</Text>
            <Text style={styles.textTitle}>{vacation.title}</Text>
            <Text>{vacation.description}</Text>
            <Text>{vacation.location}</Text>
            <Text>
              Days:{' '}
              {vacation.dates
                .map(({ date }) => format(new Date(date), 'dd'))
                .join(', ')}
            </Text>
            <View style={styles.sectionParticipants}>
              {vacation.users?.length === 1 ? (
                <View style={styles.participantsPair}>
                  {vacation.users?.map((user: UserApiProps) => (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <View key={user.id} style={styles.participants}>
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <Image style={styles.image} src={user.photo} />
                      <Text>{user.name}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <>
                  <View style={styles.participantsPair}>
                    {userPart1?.map((user: UserApiProps) => (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <View key={user.id} style={styles.participants}>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image style={styles.image} src={user.photo} />
                        <Text>{user.name}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.participantsPair}>
                    {userPart2?.map((user: UserApiProps) => (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <View key={user.id} style={styles.participants}>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image style={styles.image} src={user.photo} />
                        <Text>{user.name}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
