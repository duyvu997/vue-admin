<template>
  <div class="lessons-container">
    <div class="lessons-header">
      <div>
        <el-radio-group v-model="listQuery.filter.status">
          <el-radio-button label="Tất cả">Tất cả</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-button @click="$router.push({ path: '/courses/create' })"
          >Tạo khoá học mới</el-button
        >
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
          <div class="block">
            <el-avatar
              :size="50"
              :src="scope.row.imageUrl"
            ></el-avatar>
          </div>
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
            {{ scope.row.authors }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110" align="center">
        <template slot-scope="scope">
          <i class="icon-desc el-icon-time" />
          <span>{{ (scope.row.duration / 60).toFixed() }} phút</span>
        </template>
      </el-table-column>
      <el-table-column width="90" align="center">
        <template slot-scope="scope">
          <i class="icon-desc el-icon-user-solid"></i>
          {{ scope.row.teachers }}
        </template>
      </el-table-column>
      <el-table-column width="80" align="center">
        <template slot-scope="scope">
          <i class="icon-desc el-icon-user-solid"></i>
          {{ scope.row.members }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <i class="icon-desc el-icon-notebook-2" />
          <span>{{ scope.row.lessons }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <i
            class="icon-desc el-icon-s-data"
            style="transform: rotate(90deg)"
          />
          <span>{{ scope.row.quizzes }}</span>
        </template> </el-table-column
      ><el-table-column align="center" width="90">
        <template slot-scope="scope">
          {{ scope.row.progress || 0 }} %
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" width="110" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" disabled> </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button @click="handleEditCourse(scope.row.id)">Xem</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import store from '@/store'
import { courseAction, GET_COURSES } from '@/store/course/action.type'
import { fileHanldeMixin } from '@/mixins/fileHandleMixin'
export default (Vue as VueConstructor<
  Vue & InstanceType<typeof fileHanldeMixin>
>).extend({
  name: 'CourseList',
  mixins: [fileHanldeMixin],
  data() {
    return {
      listLoading: true,
      list: [],
      listQuery: {
        page: 1,
        limit: 20,
        filter: {
          status: 'all'
        }
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    async getList() {
      this.listLoading = true
      try {
        const courses = await store.dispatch(courseAction(GET_COURSES))
        const imagePromises: any[] = []
        courses.data.forEach((el: any) =>
          imagePromises.push(this.buildImageUrl(el, 'fileId', 'courseImageUrl'))
        )
        const imageUrls = await Promise.all(imagePromises)
        this.list = courses.data.map((course: any, index: number) => {
          return {
            ...course,
            status: course.status === 'ENABLE',
            imageUrl: imageUrls[index]
          }
        })

        this.listLoading = false
      } catch (error) {
        console.warn(error)
      }
    },

    handleEditCourse(courseId: string) {
      this.$router.push({ path: `edit/${courseId}` })
    }
  }
})
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

.icon-desc {
  margin-right: 0.3rem;
}
</style>
