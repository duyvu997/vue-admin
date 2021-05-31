<template>
  <div class="lessons-container">
    <div class='lessons-header'>
      <div>
        <el-radio-group v-model="listQuery.filter.status">
          <el-radio-button label="Tất cả">Tất cả</el-radio-button>
          <el-radio-button label="Đang mở">Đang mở</el-radio-button>
          <el-radio-button label="Đã đóng">Đã đóng</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-button>Tạo khoá học mới</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      :show-header="false"
    >
      <el-table-column align="center" width="95">
        <template slot-scope="scope">
           <div class="block"><el-avatar :size="50" :src="scope.row.picture"></el-avatar></div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div>
            <b>
              {{ scope.row.name }}
            </b>
          </div>
          <div style="font-size: 12px">
           {{ scope.row.teacherName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.duration }}</span>
        </template>
      </el-table-column>
      <el-table-column width="90" align="center">
        <template slot-scope="scope">
          <i class='el-icon-user-solid'></i>
          {{ scope.row.students }}
        </template>
      </el-table-column>
      <el-table-column width="80" align="center">
        <template slot-scope="scope">
          <i class='el-icon-user-solid'></i>
          {{ scope.row.studentsGear }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <i class="el-icon-notebook-2" />
          <span>{{ scope.row.lessons }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <i class="el-icon-s-data" style="transform: rotate(90deg)"/>
          <span>{{ scope.row.units }}</span>
        </template>
      </el-table-column><el-table-column align="center" width="90">
        <template slot-scope="scope">
          <el-progress
            type="circle"
            :percentage="scope.row.progress"
            stroke-width="3"
            width="50"
            ></el-progress>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" width="110" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" disabled> </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template>
          <el-button>Cài đặt</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getArticles } from '@/api/articles'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Lessons'
})
export default class extends Vue {
  private list = [];
  private listLoading = true;
  private listQuery = {
    page: 1,
    limit: 20,
    filter: {
      status: 'all'
    }
  };

  created() {
    this.getList()
  }

  private getList() {
    this.listLoading = true
    try {
      const { data } = {
        data: {
          items: [
            {
              name: 'Lop 1',
              teacherName: 'Co 1',
              duration: '10',
              durationType: 'giây',
              students: 30,
              studentsGear: 4,
              lessons: 3,
              units: 20,
              progress: 83,
              date: '',
              shortDesc: '',
              desc: '',
              status: false,
              minimumAge: '',
              maximumAge: '',
              picture: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            },
            {
              name: 'Lop 2',
              teacherName: 'Co 2',
              duration: '10',
              durationType: 'giây',
              students: 30,
              studentsGear: 4,
              lessons: 3,
              units: 20,
              progress: 83,
              date: '',
              shortDesc: '',
              desc: '',
              status: false,
              minimumAge: '',
              maximumAge: '',
              picture: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            },
            {
              name: 'Lop 3',
              teacherName: 'Co 3',
              duration: '10',
              durationType: 'giây',
              students: 30,
              studentsGear: 4,
              lessons: 3,
              units: 20,
              progress: 83,
              date: '',
              shortDesc: '',
              desc: '',
              status: false,
              minimumAge: '',
              maximumAge: '',
              picture: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            }
          ]
        }
      }
      this.list = data.items as any
    } catch (error) {
      console.warn(error)
    }
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }
}
</script>

<style lang="scss">
.lessons {
  &-container {
    margin: 30px;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .el-radio-button__inner {
      border: unset !important;
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: black;
      font-weight: bold;
      background-color: white;
      box-shadow: unset;
    }
  }
}
</style>
